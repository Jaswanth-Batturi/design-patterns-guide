#!/usr/bin/env node
/**
 * Verify pattern-code.ts entries are runnable single-file Java with main().
 */
import { patternCode } from '../src/data/patterns/pattern-code.ts';

const slugs = Object.keys(patternCode);
let failed = 0;

for (const slug of slugs) {
  const entry = patternCode[slug];
  if (!entry.codeBefore.includes('public static void main')) {
    console.error(`MISSING main in codeBefore: ${slug}`);
    failed++;
  }
  if (!entry.codeAfter.includes('public static void main')) {
    console.error(`MISSING main in codeAfter: ${slug}`);
    failed++;
  }
  if (entry.runDemo !== entry.codeAfter) {
    console.error(`runDemo !== codeAfter: ${slug}`);
    failed++;
  }
  if (!/^public class \w+/m.test(entry.codeAfter)) {
    console.error(`codeAfter missing public class: ${slug}`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n${failed} pattern-code check(s) failed.`);
  process.exit(1);
}

console.log(`OK — ${slugs.length} patterns have runnable before/after code.`);
