/**
 * Deep audit — static HTML + browser smoke (updated for current UI).
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
    record('HIGH', 'Build', 'dist/ missing');
    return;
  }

  const required = ['Real-life analogy', 'In your code', 'Run it', 'Quiz'];
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
    for (const s of stale) {
      if (html.includes(s)) record('HIGH', slug, `Stale: ${s}`);
    }
    if (html.match(/href="\/patterns\//)) record('HIGH', slug, 'Absolute /patterns/ link');
  }

  const index = readFileSync(join(dist, 'index.html'), 'utf8');
  if (!index.includes('Browse patterns')) record('HIGH', 'Home', 'Missing library heading');
  for (const s of stale) {
    if (index.includes(s)) record('HIGH', 'Home', `Stale: ${s}`);
  }
}

async function auditBrowser() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`${BASE}/patterns/observer/`, { waitUntil: 'domcontentloaded' });

  const related = page.getByText('Related');
  if (await related.count() === 0) record('MED', 'Observer', 'Related section missing');

  const sectionLinks = page.locator('nav[aria-label="Page sections"] a');
  if (await sectionLinks.count() < 5) record('HIGH', 'Pattern', 'Section nav incomplete');

  await browser.close();
}

auditDist();
await auditBrowser();

console.log('\n--- DEEP AUDIT ---');
const high = issues.filter((i) => i.severity === 'HIGH');
if (high.length) {
  high.forEach((i) => console.error(`HIGH [${i.area}] ${i.message}`));
  process.exit(1);
}
console.log(`OK — ${issues.length} non-blocking issues`);
if (issues.length) console.log(issues);
