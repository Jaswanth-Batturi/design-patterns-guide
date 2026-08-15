/**
 * Deep audit — static HTML + browser checks E2E may miss.
 */
import { readFileSync, existsSync } from 'node:fs';
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

function auditDist() {
  if (!existsSync(dist)) {
    record('HIGH', 'Build', 'dist/ missing — run npm run build');
    return;
  }

  const required = ['Real-life analogy', 'Without vs with', 'Run it', 'Quiz', 'Expected output'];
  const stale = ['Patterns in Practice', 'Design Patterns, Simply'];

  for (const slug of slugs) {
    const path = join(dist, 'patterns', slug, 'index.html');
    if (!existsSync(path)) {
      record('HIGH', 'Dist', `Missing ${slug}`);
      continue;
    }
    const html = readFileSync(path, 'utf8');
    for (const s of required) {
      if (!html.includes(s)) record('HIGH', slug, `Missing "${s}"`);
    }
    if (!html.includes('<svg')) record('HIGH', slug, 'Missing SVG illustration');
    if (!html.includes('When to use')) record('HIGH', slug, 'Missing when-to-use section');
    if (!html.includes('Copy demo code')) record('MED', slug, 'Missing copy demo button');
    for (const s of stale) {
      if (html.includes(s)) record('HIGH', slug, `Stale: ${s}`);
    }
    if (html.match(/href="\/patterns\//)) record('HIGH', slug, 'Absolute /patterns/ link');
    if (html.includes('(view: string)')) record('HIGH', slug, 'TypeScript in CodeToggle script');
  }

  const index = readFileSync(join(dist, 'index.html'), 'utf8');
  if (!index.includes('Browse patterns')) record('HIGH', 'Home', 'Missing library heading');
  if (!index.includes('search-empty')) record('HIGH', 'Home', 'Missing search empty state');
  for (const s of stale) {
    if (index.includes(s)) record('HIGH', 'Home', `Stale: ${s}`);
  }
}

async function auditBrowser() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.locator('#pattern-search').fill('zzzznonmatch');
  await page.waitForTimeout(120);
  const emptyVisible = await page.locator('#search-empty:not(.hidden)').isVisible();
  if (!emptyVisible) record('HIGH', 'Home', 'Search empty message not shown');

  await page.goto(`${BASE}/patterns/observer/`, { waitUntil: 'domcontentloaded' });

  const sectionLinks = page.locator('nav[aria-label="Page sections"] a');
  const count = await sectionLinks.count();
  if (count !== 6) record('HIGH', 'Observer', `Expected 6 section jumps, got ${count}`);

  const whenJump = sectionLinks.filter({ hasText: 'When to use' });
  if (await whenJump.count() === 0) record('HIGH', 'Observer', 'When to use jump missing');

  await whenJump.click();
  await page.waitForTimeout(400);
  const decisionBox = await page.locator('#decision').boundingBox();
  if (!decisionBox || decisionBox.y > 280) {
    record('MED', 'Observer', 'When to use jump scroll position off');
  }

  const toggle = page.locator('[data-code-toggle]');
  await toggle.getByRole('tab', { name: 'Fixed' }).click();
  if (!(await toggle.locator('[data-panel="after"]').isVisible())) {
    record('HIGH', 'Observer', 'Fixed code tab broken');
  }

  const related = page.getByText('Related');
  if (await related.count() === 0) record('MED', 'Observer', 'Related section missing');

  await browser.close();
}

auditDist();
await auditBrowser();

console.log('\n--- DEEP AUDIT ---');
const high = issues.filter((i) => i.severity === 'HIGH');
if (high.length) {
  high.forEach((i) => console.error(`HIGH [${i.area}] ${i.msg}`));
  process.exit(1);
}
console.log(`OK — ${issues.length} non-blocking issues`);
if (issues.length) console.log(issues);
