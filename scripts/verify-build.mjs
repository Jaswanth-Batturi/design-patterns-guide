#!/usr/bin/env node
/**
 * Smoke-test built static site: every pattern page and key assets must exist.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(import.meta.dirname, '..', 'dist');
const base = '/design-patterns-guide';

const slugs = [
  'singleton', 'factory', 'abstract-factory', 'builder', 'prototype',
  'adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy',
  'chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator',
  'memento', 'observer', 'state', 'strategy', 'template-method', 'visitor',
];

const required = [
  'index.html',
  '404.html',
  'og-image.jpg',
  ...slugs.map((s) => `patterns/${s}/index.html`),
];

let failed = 0;

for (const file of required) {
  const path = join(dist, file);
  if (!existsSync(path)) {
    console.error(`MISSING: ${file}`);
    failed++;
  }
}

const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8');
if (!indexHtml.includes('Design Patterns')) {
  console.error('MISSING: homepage branding');
  failed++;
}
if (indexHtml.includes('href="/patterns/')) {
  console.error('BROKEN LINK: absolute /patterns/ without base path in index');
  failed++;
}
if (!indexHtml.includes(`${base}/patterns/observer`)) {
  console.error('BROKEN LINK: expected base-prefixed pattern URLs');
  failed++;
}

const observerHtml = readFileSync(join(dist, 'patterns/observer/index.html'), 'utf8');
if (!observerHtml.includes('shiki') && !observerHtml.includes('github-dark')) {
  // shiki outputs style/class in HTML
  if (!observerHtml.includes('color:')) {
    console.error('MISSING: syntax highlighting on observer page');
    failed++;
  }
}
if (!observerHtml.includes('data-oc-frame')) {
  console.error('MISSING: OneCompiler runner on observer page');
  failed++;
}
const singletonHtml = readFileSync(join(dist, 'patterns/singleton/index.html'), 'utf8');
if (singletonHtml.includes('(view: string)')) {
  console.error('BROKEN JS: TypeScript left in CodeToggle script (define:vars scripts are not transpiled)');
  failed++;
}
if (!observerHtml.includes('scene-card') && !observerHtml.includes('Real-life analogy')) {
  console.error('MISSING: real-life scene on observer page');
  failed++;
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}

console.log(`OK — ${slugs.length} patterns, assets, links, highlighting, runner, and animations verified.`);
