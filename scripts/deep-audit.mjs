/**
 * Deep audit — content, links, sections, UX gaps E2E misses.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.SITE_URL || 'http://127.0.0.1:4321/design-patterns-guide';
const dist = join(import.meta.dirname, '..', 'dist');
const slugs = [
  'singleton', 'factory', 'abstract-factory', 'builder', 'prototype',
  'adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy',
  'chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator',
  'memento', 'observer', 'state', 'strategy', 'template-method', 'visitor',
];

const issues = [];
const record = (severity, area, msg) => {
  issues.push({ severity, area, msg });
  console.log(`[${severity}] ${area}: ${msg}`);
};

// --- Static HTML audit (dist) ---
function auditDist() {
  if (!existsSync(dist)) {
    record('HIGH', 'Build', 'dist/ missing — run npm run build');
    return;
  }

  const requiredSections = [
    'Start with real life',
    'Same story in software',
    'Code comparison',
    'Run it',
    'Quick quiz',
  ];

  for (const slug of slugs) {
    const path = join(dist, 'patterns', slug, 'index.html');
    if (!existsSync(path)) {
      record('HIGH', 'Dist', `Missing ${slug}`);
      continue;
    }
    const html = readFileSync(path, 'utf8');
    for (const section of requiredSections) {
      if (!html.includes(section)) {
        record('HIGH', slug, `Missing section: "${section}"`);
      }
    }
    if (!html.includes('Everyday moment') && !html.includes('scene-card')) {
      record('MED', slug, 'Scene step labels may be missing');
    }
    if (html.includes('Patterns in Practice')) {
      record('HIGH', slug, 'Stale branding "Patterns in Practice"');
    }
    // Broken absolute links
    const badLinks = html.match(/href="\/patterns\/[^"]*"/g) ?? [];
    if (badLinks.length > 0) {
      record('HIGH', slug, `Absolute /patterns/ links: ${badLinks.slice(0, 3).join(', ')}`);
    }
    if (html.includes('href="/design-patterns-guide/design-patterns-guide')) {
      record('HIGH', slug, 'Double base path in href');
    }
  }

  const index = readFileSync(join(dist, 'index.html'), 'utf8');
  if (index.includes('href="#patterns"') && !index.includes('/design-patterns-guide/#patterns')) {
    record('MED', 'Home', 'Hero uses #patterns only — breaks if opened from non-root (use sitePath)');
  }
  if (!index.includes('pattern-search') && !index.includes('id="pattern-search"')) {
    record('MED', 'Home', 'Pattern search input missing');
  }
}

async function auditBrowser() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const mobilePage = await mobile.newPage();

  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });

  // Search
  const search = page.locator('#pattern-search');
  if (await search.count() === 0) {
    record('HIGH', 'Search', 'pattern-search not found');
  } else {
    await search.fill('observer');
    await page.waitForTimeout(100);
    const visible = await page.locator('.pattern-card:not(.hidden)').count();
    if (visible !== 1) {
      record('HIGH', 'Search', `observer search shows ${visible} cards, expected 1`);
    }
    await search.fill('');
    await page.waitForTimeout(100);
    if (await page.locator('.pattern-card:not(.hidden)').count() !== 23) {
      record('HIGH', 'Search', 'Clearing search did not restore all cards');
    }
  }

  // Filter + search combo
  await page.getByRole('button', { name: /Creational/i }).click();
  await search.fill('singleton');
  await page.waitForTimeout(100);
  const combo = await page.locator('.pattern-card:not(.hidden)').count();
  if (combo !== 1) {
    record('MED', 'Search', `Filter+search combo shows ${combo} cards, expected 1`);
  }

  // Mobile layout smoke
  await mobilePage.goto(`${BASE}/patterns/observer/`, { waitUntil: 'domcontentloaded' });
  const sceneCards = mobilePage.locator('.scene-card');
  if (await sceneCards.count() < 3) {
    record('HIGH', 'Mobile', 'Scene cards < 3 on observer');
  }
  const sceneBox = await sceneCards.first().boundingBox();
  if (sceneBox && sceneBox.width > 400) {
    record('MED', 'Mobile', `Scene card width ${sceneBox.width}px may overflow 390 viewport`);
  }

  // Related / confused section
  await page.goto(`${BASE}/patterns/observer/`, { waitUntil: 'domcontentloaded' });
  const confused = page.getByText('Often confused with');
  if (await confused.count() === 0) {
    record('MED', 'Observer', 'Missing "Often confused with" section');
  }
  const relatedLinks = page.locator('section').filter({ hasText: 'Often confused with' }).locator('a');
  if (await relatedLinks.count() === 0) {
    record('HIGH', 'Observer', 'No related pattern links');
  } else {
    const href = await relatedLinks.first().getAttribute('href');
    if (!href?.includes('/patterns/')) {
      record('HIGH', 'Related', `Bad href: ${href}`);
    }
  }

  // Section nav should be useful (currently dead spans — flag if no links)
  const sectionNav = page.locator('nav[aria-label="Page sections"]');
  const sectionLinks = sectionNav.locator('a');
  if (await sectionLinks.count() === 0) {
    record('MED', 'Pattern page', 'Page section nav has no clickable anchors');
  }

  // Quiz: only current question locks
  await page.goto(`${BASE}/patterns/factory/`, { waitUntil: 'domcontentloaded' });
  const q1Buttons = page.locator('[data-quiz] button').first();
  await q1Buttons.click();
  const stillEnabled = await page.locator('[data-quiz] button:not(:disabled)').count();
  if (stillEnabled < 2) {
    record('HIGH', 'Quiz', 'All quiz buttons disabled after one question — should only lock current Q');
  }

  // OG image loads
  const ogRes = await page.goto(`${BASE}/og-image.jpg`);
  if (!ogRes || ogRes.status() !== 200) {
    record('HIGH', 'Assets', `og-image.jpg status ${ogRes?.status()}`);
  }

  // Favicon
  const favRes = await page.goto(`${BASE}/favicon.svg`);
  if (!favRes || favRes.status() !== 200) {
    record('MED', 'Assets', `favicon status ${favRes?.status()}`);
  }

  // Library nav from pattern page — must include base path
  await page.goto(`${BASE}/patterns/singleton/`, { waitUntil: 'domcontentloaded' });
  await page.getByLabel('Main').getByRole('link', { name: 'Patterns', exact: true }).click();
  await page.waitForTimeout(400);
  const libUrl = page.url();
  if (!libUrl.includes('#patterns') && !libUrl.endsWith('/design-patterns-guide/')) {
    record('MED', 'Nav', `Library link landed at ${libUrl}`);
  }

  // Breadcrumb Library link
  await page.goto(`${BASE}/patterns/singleton/`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Patterns').click();
  await page.waitForTimeout(400);

  // Each pattern: runner iframe present
  for (const slug of slugs) {
    await page.goto(`${BASE}/patterns/${slug}/`, { waitUntil: 'domcontentloaded' });
    if (await page.locator('[data-oc-frame]').count() === 0) {
      record('HIGH', slug, 'Missing code runner iframe');
    }
    if (await page.locator('[data-quiz]').count() === 0) {
      record('HIGH', slug, 'Missing quiz');
    }
    const h1 = await page.locator('h1').innerText();
    if (h1.toLowerCase().includes(slug.replace(/-/g, ' ')) === false && slug !== 'abstract-factory') {
      // loose check — factory vs Factory Method etc
    }
  }

  await browser.close();
}

auditDist();
await auditBrowser();

console.log('\n--- DEEP AUDIT SUMMARY ---');
console.log(`Issues: ${issues.length}`);
const high = issues.filter((i) => i.severity === 'HIGH');
if (high.length) {
  high.forEach((i) => console.error(`  HIGH [${i.area}] ${i.message}`));
  process.exit(1);
}
if (issues.length) console.log('Non-blocking:', issues);
else console.log('Deep audit passed.');
