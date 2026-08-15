/**
 * Pro E2E — every page, every pattern, every interactive surface.
 * Run: npm run test:e2e:full  (local preview on :4321)
 *      npm run test:e2e:full:live
 */
import { chromium } from 'playwright';

const BASE = process.env.SITE_URL || 'http://127.0.0.1:4321/design-patterns-guide';
const SLUGS = [
  'singleton', 'factory', 'abstract-factory', 'builder', 'prototype',
  'adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy',
  'chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator',
  'memento', 'observer', 'state', 'strategy', 'template-method', 'visitor',
];

const STALE = ['Patterns in Practice', 'Design Patterns, Simply', 'Real-life scene → code'];
const PATTERN_SECTIONS = ['Real-life analogy', 'Without vs with', 'Code: problem vs fix', 'Run it', 'Quiz'];
const SECTION_IDS = ['problem', 'story', 'code', 'tradeoffs', 'run', 'decision', 'quiz'];

const issues = [];
const record = (severity, area, msg) => {
  issues.push({ severity, area, msg });
  console.log(`[${severity}] ${area}: ${msg}`);
};

async function completeQuiz(page, slug) {
  const quiz = page.locator('[data-quiz]');
  if (await quiz.count() === 0) {
    record('HIGH', slug, 'Quiz container missing');
    return;
  }
  const opts = page.locator('[data-quiz] .quiz-option');
  if (await opts.count() < 2) {
    record('HIGH', slug, 'Quiz has fewer than 2 options');
    return;
  }
  await opts.first().click();
  const next = page.locator('[data-quiz-next]');
  if (await next.count() === 0) {
    record('HIGH', slug, 'Quiz next button missing');
    return;
  }
  await next.click();
  const opts2 = page.locator('[data-quiz] .quiz-option');
  if (await opts2.count() > 0) await opts2.first().click();
  await next.click();
  const score = page.locator('[data-quiz-score]');
  if (!(await score.isVisible())) {
    record('HIGH', slug, 'Quiz score not shown after completion');
  } else {
    const t = await score.innerText();
    if (!t.includes('Score')) record('HIGH', slug, `Quiz score text wrong: ${t}`);
  }
}

async function testCodeToggle(page, slug) {
  const toggle = page.locator('[data-code-toggle]');
  if (await toggle.count() === 0) {
    record('HIGH', slug, 'Code toggle missing');
    return;
  }
  const problem = toggle.getByRole('tab', { name: 'Problem' });
  const fixed = toggle.getByRole('tab', { name: 'Fixed' });
  if (await problem.getAttribute('aria-selected') !== 'true') {
    record('HIGH', slug, 'Default tab should be Problem');
  }
  if (!(await toggle.locator('[data-panel="before"]').isVisible())) {
    record('HIGH', slug, 'Problem code panel not visible');
  }
  await fixed.click();
  const afterPanel = toggle.locator('[data-panel="after"]');
  await afterPanel.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
  if (!(await afterPanel.isVisible())) {
    record('HIGH', slug, 'Fixed code panel not visible after tab click');
  }
  await problem.click();
  const beforeRaw = await toggle.getAttribute('data-before-raw');
  const afterRaw = await toggle.getAttribute('data-after-raw');
  if (!beforeRaw?.trim() || !afterRaw?.trim()) {
    record('HIGH', slug, 'Code toggle missing raw code data');
  }
  if (beforeRaw === afterRaw) {
    record('HIGH', slug, 'Problem and Fixed code are identical');
  }
}

async function testPatternPage(page, slug) {
  const url = `${BASE}/patterns/${slug}/`;
  const res = await page.goto(url, { waitUntil: 'domcontentloaded' });
  if (!res || res.status() !== 200) {
    record('HIGH', slug, `HTTP ${res?.status()}`);
    return;
  }

  const body = await page.locator('body').innerText();
  for (const stale of STALE) {
    if (body.includes(stale)) record('HIGH', slug, `Stale text: "${stale}"`);
  }

  for (const label of PATTERN_SECTIONS) {
    if (!body.includes(label)) record('HIGH', slug, `Missing heading: ${label}`);
  }

  if (await page.locator('#story svg').count() === 0) {
    record('HIGH', slug, 'Missing SVG illustration');
  }

  const h1 = await page.locator('h1').innerText();
  if (!h1?.trim()) record('HIGH', slug, 'Empty h1');

  const oneLiner = await page.locator('header p').first().innerText();
  if (!oneLiner || oneLiner.length < 10) record('MED', slug, 'One-liner missing or too short');

  for (const id of SECTION_IDS) {
    const el = page.locator(`#${id}`);
    if (await el.count() === 0) record('HIGH', slug, `Missing #${id} section`);
  }

  const jumps = page.locator('nav[aria-label="Page sections"] a.section-jump');
  if (await jumps.count() !== 7) {
    record('HIGH', slug, `Expected 7 section jumps, got ${await jumps.count()}`);
  }

  const homeCrumb = page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Home');
  const patternsCrumb = page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Patterns');
  if (await homeCrumb.count() === 0 || await patternsCrumb.count() === 0) {
    record('HIGH', slug, 'Breadcrumb incomplete');
  }

  const decision = page.locator('#decision');
  if (await decision.count() === 0) record('MED', slug, 'When to use section missing');

  await testCodeToggle(page, slug);
  await completeQuiz(page, slug);

  const frame = page.locator('[data-oc-frame]');
  if (await frame.count() === 0) {
    record('HIGH', slug, 'Code runner iframe missing');
  } else {
    const src = await frame.getAttribute('src');
    if (!src?.includes('onecompiler.com/embed/java')) {
      record('HIGH', slug, `Bad runner src: ${src}`);
    }
  }

  const links = await page.locator('a[href]').evaluateAll((els) =>
    els.map((a) => ({ href: a.getAttribute('href'), text: a.textContent?.trim() })),
  );
  for (const { href } of links) {
    if (href?.startsWith('/patterns/')) {
      record('HIGH', slug, `Broken absolute link: ${href}`);
    }
    if (href?.includes('/design-patterns-guide/design-patterns-guide')) {
      record('HIGH', slug, `Double base path: ${href}`);
    }
  }

  const navPrevNext = page.locator('nav[aria-label="Pattern navigation"] a');
  if (await navPrevNext.count() === 0 && slug !== 'singleton' && slug !== 'visitor') {
    record('MED', slug, 'Missing prev/next navigation');
  }
}

async function testHomepage(page) {
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });

  if (!(await page.title()).includes('Design Patterns')) {
    record('HIGH', 'Home', `Bad title: ${await page.title()}`);
  }

  const body = await page.locator('body').innerText();
  for (const stale of STALE) {
    if (body.includes(stale)) record('HIGH', 'Home', `Stale text: ${stale}`);
  }

  if (await page.locator('.pattern-card').count() !== 23) {
    record('HIGH', 'Home', 'Not 23 pattern cards');
  }

  const cards = page.locator('.pattern-card a');
  for (let i = 0; i < await cards.count(); i++) {
    const href = await cards.nth(i).getAttribute('href');
    if (!href?.includes('/patterns/')) record('HIGH', 'Home', `Card ${i} bad href: ${href}`);
    const text = await cards.nth(i).innerText();
    if (text.length < 15) record('MED', 'Home', `Card ${i} content too short`);
  }

  await page.locator('#pattern-search').fill('observer');
  await page.waitForTimeout(120);
  if (await page.locator('.pattern-card:not(.hidden)').count() !== 1) {
    record('HIGH', 'Home', 'Search observer failed');
  }
  await page.locator('#pattern-search').fill('');
  await page.waitForTimeout(120);

  await page.locator('#pattern-search').fill('zzzznonmatch');
  await page.waitForTimeout(120);
  if (!(await page.locator('#search-empty:not(.hidden)').isVisible())) {
    record('HIGH', 'Home', 'Search empty state not shown');
  }
  await page.locator('#pattern-search').fill('');
  await page.waitForTimeout(120);

  for (const cat of ['creational', 'structural', 'behavioral']) {
    await page.getByRole('button', { name: new RegExp(cat, 'i') }).click();
  }
  await page.getByRole('button', { name: 'All' }).click();

  const chips = page.locator('[data-example]');
  for (let i = 0; i < await chips.count(); i++) {
    await chips.nth(i).click();
    await page.waitForTimeout(80);
    const results = await page.locator('#finder-results').innerText();
    if (!results.trim()) record('HIGH', 'Finder', `Chip ${i} no results`);
  }

  await page.locator('#finder-input').fill('zzzznonmatch');
  await page.waitForTimeout(80);
  if (!(await page.locator('#finder-results').innerText()).includes('No match')) {
    record('HIGH', 'Finder', 'No-match message missing');
  }

  const navLinks = ['Patterns', 'Finder', 'GitHub'];
  for (const name of navLinks) {
    if (await page.getByLabel('Main').getByRole('link', { name, exact: true }).count() === 0) {
      record('HIGH', 'Nav', `Missing nav link: ${name}`);
    }
  }
}

async function testMobile(page) {
  const mobile = await chromium.launch({ headless: true });
  const ctx = await mobile.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/patterns/singleton/`, { waitUntil: 'domcontentloaded' });
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
  if (overflow) record('HIGH', 'Mobile', 'Horizontal overflow on singleton page');
  await mobile.close();
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();

  console.log(`Testing ${BASE}\n`);

  await testHomepage(page);

  for (const slug of SLUGS) {
    await testPatternPage(page, slug);
  }

  // 404
  await page.goto(`${BASE}/patterns/fake-slug-xyz/`, { waitUntil: 'domcontentloaded' });
  const b404 = await page.locator('body').innerText();
  if (!b404.match(/404|not found/i)) record('HIGH', '404', '404 page broken');

  // Assets
  const og = await page.goto(`${BASE}/og-image.jpg`);
  if (!og || og.status() !== 200) record('HIGH', 'Assets', 'og-image.jpg failed');
  const fav = await page.goto(`${BASE}/favicon.svg`);
  if (!fav || fav.status() !== 200) record('MED', 'Assets', 'favicon.svg failed');

  await browser.close();
  await testMobile();

  console.log('\n--- FULL E2E SUMMARY ---');
  console.log(`Patterns tested: ${SLUGS.length}`);
  console.log(`Issues: ${issues.length}`);

  const high = issues.filter((i) => i.severity === 'HIGH');
  const med = issues.filter((i) => i.severity === 'MED');

  if (high.length) {
    console.error('\nHIGH (must fix):');
    high.forEach((i) => console.error(`  [${i.area}] ${i.msg}`));
    process.exit(1);
  }
  if (med.length) {
    console.log('\nMED:');
    med.forEach((i) => console.log(`  [${i.area}] ${i.msg}`));
  }
  if (!issues.length) console.log('All checks passed.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
