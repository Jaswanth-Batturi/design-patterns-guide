#!/usr/bin/env node
/**
 * Ensure enriched pattern pages have run guidance and println in demos.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(import.meta.dirname, '..', 'dist');
const overridesPath = join(import.meta.dirname, '..', 'src/data/patterns/pattern-overrides.ts');
const overridesSrc = readFileSync(overridesPath, 'utf8');

const slugs = [
  'singleton', 'factory', 'abstract-factory', 'builder', 'prototype',
  'adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy',
  'chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator',
  'memento', 'observer', 'state', 'strategy', 'template-method', 'visitor',
];

let failed = 0;

for (const slug of slugs) {
  const htmlPath = join(dist, 'patterns', slug, 'index.html');
  if (!existsSync(htmlPath)) {
    console.error(`MISSING dist page: ${slug}`);
    failed++;
    continue;
  }
  const html = readFileSync(htmlPath, 'utf8');
  if (!html.includes('Copy demo code')) {
    console.error(`MISSING copy demo button: ${slug}`);
    failed++;
  }
  const expectMatch = html.match(/data-run-expect[^>]*>([^<]+)</);
  if (!expectMatch?.[1]?.trim()) {
    console.error(`EMPTY runExpect in HTML: ${slug}`);
    failed++;
  }
  const slugMarker = overridesSrc.includes(`'${slug}': {`)
    ? `'${slug}': {`
    : `${slug}: {`;
  const start = overridesSrc.indexOf(slugMarker);
  if (start === -1) {
    console.error(`MISSING override entry: ${slug}`);
    failed++;
    continue;
  }
  const slice = overridesSrc.slice(start, start + 8000);
  const demoStart = slice.indexOf('runDemo: `');
  if (demoStart === -1) {
    console.error(`MISSING runDemo in overrides: ${slug}`);
    failed++;
    continue;
  }
  const demoEnd = slice.indexOf('`', demoStart + 10);
  const demo = slice.slice(demoStart, demoEnd);
  if (!/System\.out\.println/.test(demo)) {
    console.error(`NO println in runDemo: ${slug}`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n${failed} coherence check(s) failed.`);
  process.exit(1);
}

console.log(`OK — ${slugs.length} patterns have run guidance and println demos.`);
