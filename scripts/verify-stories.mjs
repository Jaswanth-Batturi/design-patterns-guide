#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const slugs = [
  'singleton', 'factory', 'abstract-factory', 'builder', 'prototype',
  'adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy',
  'chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator',
  'memento', 'observer', 'state', 'strategy', 'template-method', 'visitor',
];

const text = readFileSync(
  join(import.meta.dirname, '..', 'src/data/patterns/pattern-stories.ts'),
  'utf8',
);
const found = [...text.matchAll(/^\s{2}['"]?([\w-]+)['"]?:\s*\{/gm)].map((m) => m[1]);

let failed = 0;
for (const slug of slugs) {
  if (!found.includes(slug)) {
    console.error(`MISSING story: ${slug}`);
    failed++;
  }
}

if (failed) process.exit(1);
console.log(`OK — ${slugs.length} connected stories defined.`);
