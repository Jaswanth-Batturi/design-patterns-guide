#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const slugs = [
  'singleton', 'factory', 'abstract-factory', 'builder', 'prototype',
  'adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy',
  'chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator',
  'memento', 'observer', 'state', 'strategy', 'template-method', 'visitor',
];

const snippetsPath = join(import.meta.dirname, '..', 'src/data/patterns/pattern-code-snippets.ts');
const illosPath = join(import.meta.dirname, '..', 'src/data/patterns/pattern-illustrations.ts');
const snippetText = readFileSync(snippetsPath, 'utf8');
const illoText = readFileSync(illosPath, 'utf8');

const snippetKeys = [...snippetText.matchAll(/^\s{2}['"]?([\w-]+)['"]?:\s*\{/gm)].map((m) => m[1]);
const illoKeys = [...illoText.matchAll(/^\s{2}['"]?([\w-]+)['"]?:\s*\{/gm)].map((m) => m[1]);

let failed = 0;
for (const slug of slugs) {
  if (!snippetKeys.includes(slug)) {
    console.error(`MISSING code snippet: ${slug}`);
    failed++;
  }
  if (!illoKeys.includes(slug)) {
    console.error(`MISSING illustration: ${slug}`);
    failed++;
  }
}

if (failed) process.exit(1);
console.log(`OK — ${slugs.length} code snippets and illustrations.`);
