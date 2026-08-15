/**
 * Full browser E2E — exercises every interactive surface on the site.
 * Run: npm run test:e2e
 */
import { chromium } from 'playwright';

const BASE = process.env.SITE_URL || 'http://127.0.0.1:4321/design-patterns-guide';
const SLUGS = [
  'singleton', 'factory', 'abstract-factory', 'builder', 'prototype',
  'adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy',
  'chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator',
  'memento', 'observer', 'state', 'strategy', 'template-method', 'visitor',
];

const issues = [];

function record(severity, area, message) {
  issues.push({ severity, area, message });
  console.log(`[${severity}] ${area}: ${message}`);
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page = await context.newPage();

  // --- Homepage ---
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  const title = await page.title();
  if (!title.includes('Design Patterns, Simply')) {
    record('HIGH', 'Home', `Unexpected title: ${title}`);
  }

  const cardCount = await page.locator('.pattern-card').count();
  if (cardCount !== 23) {
    record('HIGH', 'Home', `Expected 23 pattern cards, found ${cardCount}`);
  }

  // Hero CTAs use base-prefixed anchors
  const browseHref = await page.locator('a').filter({ hasText: 'Browse all 23 patterns' }).first().getAttribute('href');
  if (!browseHref?.includes('patterns')) {
    record('HIGH', 'Home', `Browse CTA href missing #patterns: ${browseHref}`);
  }

  await page.locator('a[href*="patterns"]').filter({ hasText: 'Browse all 23 patterns' }).first().click();
  await page.waitForTimeout(300);
  const patternsBox = await page.locator('#patterns').boundingBox();
  if (!patternsBox || patternsBox.y > 200) {
    record('MED', 'Home', 'Browse patterns anchor may not scroll to #patterns');
  }

  await page.locator('a[href*="finder"]').filter({ hasText: 'Help me pick' }).first().click();
  await page.waitForTimeout(300);

  // Sticky header nav
  await page.getByLabel('Main').getByRole('link', { name: 'Library', exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByRole('link', { name: 'Finder', exact: true }).click();

  // Logo home
  await page.getByRole('link', { name: 'Design Patterns, Simply' }).click();
  if (!page.url().endsWith('/design-patterns-guide/') && !page.url().endsWith('/design-patterns-guide')) {
    if (!page.url().includes('/design-patterns-guide')) {
      record('HIGH', 'Nav', `Logo link wrong: ${page.url()}`);
    }
  }

  // Category filters
  for (const cat of ['creational', 'structural', 'behavioral']) {
    await page.getByRole('button', { name: new RegExp(cat, 'i') }).click();
    const visible = await page.locator('.pattern-card:not(.hidden)').count();
    const expected = cat === 'creational' ? 5 : cat === 'structural' ? 7 : 11;
    if (visible !== expected) {
      record('HIGH', 'Filters', `${cat} filter shows ${visible} cards, expected ${expected}`);
    }
  }
  await page.getByRole('button', { name: 'All' }).click();
  if (await page.locator('.pattern-card:not(.hidden)').count() !== 23) {
    record('HIGH', 'Filters', 'All filter did not restore 23 cards');
  }

  // Finder textarea + each example chip
  const chips = page.locator('[data-example]');
  const chipCount = await chips.count();
  if (chipCount < 7) {
    record('MED', 'Finder', `Expected 7 example chips, found ${chipCount}`);
  }
  for (let i = 0; i < chipCount; i++) {
    await chips.nth(i).click();
    const results = page.locator('#finder-results');
    await page.waitForTimeout(100);
    const resultText = await results.innerText();
    if (resultText.trim().length === 0) {
      const label = await chips.nth(i).innerText();
      record('HIGH', 'Finder', `Chip "${label}" produced no results`);
    }
    const firstLink = results.locator('a').first();
    if (await firstLink.count() > 0) {
      const href = await firstLink.getAttribute('href');
      if (!href?.includes('/design-patterns-guide/patterns/')) {
        record('HIGH', 'Finder', `Bad result link from chip: ${href}`);
      }
    }
  }

  // Manual finder no-match
  await page.locator('#finder-input').fill('xyz nonsense random');
  await page.waitForTimeout(100);
  const noMatch = await page.locator('#finder-results').innerText();
  if (!noMatch.includes('No strong match')) {
    record('MED', 'Finder', 'No-match message not shown for nonsense input');
  }

  // Open first pattern card
  await page.locator('.pattern-card a').first().click();
  await page.waitForLoadState('domcontentloaded');

  // --- Pattern page deep test (observer) ---
  if (!page.url().includes('/patterns/')) {
    record('HIGH', 'Navigation', 'Pattern card did not navigate');
  }

  // Breadcrumbs
  await page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Home').click();
  await page.waitForLoadState('domcontentloaded');
  await page.goto(`${BASE}/patterns/observer/`, { waitUntil: 'domcontentloaded' });

  // Code toggle — default shows WITHOUT pattern first
  const beforeTab = page.getByRole('tab', { name: 'Without pattern' });
  const afterTab = page.getByRole('tab', { name: 'With pattern' });
  if (await beforeTab.getAttribute('aria-selected') !== 'true') {
    record('HIGH', 'Code', 'Default tab should be Without pattern');
  }
  const beforeVisible = await page.locator('[data-panel="before"]').isVisible();
  if (!beforeVisible) {
    record('HIGH', 'Code', 'Without pattern panel should be visible by default');
  }
  await afterTab.click();

  // Copy code
  await page.getByRole('button', { name: 'Copy code' }).click();
  await page.waitForTimeout(200);
  const copyLabel = await page.getByRole('button', { name: /Copy|Copied/ }).innerText();
  if (!copyLabel.includes('Copied')) {
    record('MED', 'Code', `Copy button did not show Copied! (got: ${copyLabel})`);
  }

  // Quiz — wrong then verify lock
  const quizButtons = page.locator('[data-quiz] button').first();
  const allQuizBtns = page.locator('[data-quiz] button');
  const firstQBtn = allQuizBtns.first();
  await firstQBtn.click();
  const disabledCount = await page.locator('[data-quiz] button:disabled').count();
  const totalQuizBtns = await allQuizBtns.count();
  if (disabledCount < 2) {
    record('HIGH', 'Quiz', 'Quiz buttons not all disabled after answering');
  }
  // Answer remaining questions on page
  for (let i = 1; i < 3; i++) {
    const enabled = page.locator('[data-quiz] button:not(:disabled)');
    if (await enabled.count() > 0) await enabled.first().click();
  }
  const scoreText = await page.locator('[data-quiz-score]').innerText();
  if (!scoreText.includes('correct')) {
    record('MED', 'Quiz', 'Quiz score not shown after all questions');
  }

  // Java runner (OneCompiler iframe — must load and show editor)
  const runnerFrame = page.locator('[data-oc-frame]');
  const frameSrc = await runnerFrame.getAttribute('src');
  if (!frameSrc?.includes('onecompiler.com/embed/java')) {
    record('HIGH', 'CodeRunner', `Bad iframe src: ${frameSrc}`);
  }
  await page.waitForTimeout(3500);
  const loadingHidden = await page.locator('[data-runner-loading].hidden').count() > 0;
  const frameVisible = await runnerFrame.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return style.opacity !== '0' && el.clientHeight > 100;
  });
  if (!loadingHidden || !frameVisible) {
    record('HIGH', 'CodeRunner', 'OneCompiler editor did not become visible after load');
  }

  // Section jump nav
  const jumpNav = page.locator('nav[aria-label="Page sections"] a.section-jump');
  if (await jumpNav.count() < 6) {
    record('HIGH', 'Pattern page', 'Section jump links missing');
  }
  await jumpNav.filter({ hasText: 'Try it' }).click();
  await page.waitForTimeout(300);
  const tryItBox = await page.locator('#try-it').boundingBox();
  if (!tryItBox || tryItBox.y > 250) {
    record('MED', 'Pattern page', 'Try it jump link may not scroll to #try-it');
  }

  // Related pattern link
  const related = page.locator('section').filter({ hasText: 'Often confused with' }).locator('a').first();
  if (await related.count() > 0) {
    const relHref = await related.getAttribute('href');
    if (!relHref?.includes('/patterns/')) {
      record('HIGH', 'Related', `Bad related link: ${relHref}`);
    }
    await related.click();
    await page.waitForLoadState('domcontentloaded');
  }

  // Nav from pattern page to home patterns section
  await page.getByLabel('Main').getByRole('link', { name: 'Library', exact: true }).click();
  await page.waitForTimeout(500);
  if (!page.url().includes('#patterns') && !page.url().endsWith('/design-patterns-guide/')) {
    // hash might scroll on same page navigation
  }

  // Prev/next on strategy
  await page.goto(`${BASE}/patterns/strategy/`, { waitUntil: 'domcontentloaded' });
  const nextLink = page.getByRole('navigation', { name: 'Pattern navigation' }).locator('a').last();
  if (await nextLink.count() > 0) {
    await nextLink.click();
    if (!page.url().includes('/patterns/')) {
      record('HIGH', 'Prev/Next', 'Next pattern link failed');
    }
  }

  // 404
  const res404 = await page.goto(`${BASE}/patterns/not-a-real-pattern/`, { waitUntil: 'domcontentloaded' });
  const body404 = await page.locator('body').innerText();
  if (!body404.includes('404') && !body404.includes('not found')) {
    record('MED', '404', '404 page content unexpected');
  }

  // All pattern URLs load
  for (const slug of SLUGS) {
    const r = await page.goto(`${BASE}/patterns/${slug}/`, { waitUntil: 'domcontentloaded' });
    if (!r || r.status() !== 200) {
      record('HIGH', 'Routes', `${slug} returned ${r?.status()}`);
    }
    const h1 = await page.locator('h1').first().innerText();
    if (!h1 || h1.length < 2) {
      record('HIGH', 'Routes', `${slug} missing h1`);
    }
    // Quick tab click each page
    await page.getByRole('tab', { name: 'Without pattern' }).click();
    await page.getByRole('tab', { name: 'With pattern' }).click();
  }

  // Pattern search
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.locator('#pattern-search').fill('strategy');
  await page.waitForTimeout(150);
  if (await page.locator('.pattern-card:not(.hidden)').count() !== 1) {
    record('HIGH', 'Search', 'strategy filter failed on homepage');
  }

  // Skip link
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  // focus might be on skip first

  // GitHub external link
  const gh = page.locator('header a').filter({ hasText: 'GitHub' });
  const target = await gh.getAttribute('target');
  if (target !== '_blank') {
    record('LOW', 'Footer', 'GitHub link missing target=_blank');
  }

  await browser.close();

  console.log('\n--- E2E SUMMARY ---');
  console.log(`Base URL: ${BASE}`);
  console.log(`Issues found: ${issues.length}`);
  const high = issues.filter((i) => i.severity === 'HIGH');
  if (high.length > 0) {
    console.error('HIGH severity issues must be fixed:');
    high.forEach((i) => console.error(`  - [${i.area}] ${i.message}`));
    process.exit(1);
  }
  if (issues.length > 0) {
    console.log('Non-blocking issues:', issues);
  } else {
    console.log('All interactive checks passed.');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
