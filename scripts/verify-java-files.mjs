#!/usr/bin/env node
/** Ensure every pattern runDemo bundles to exactly one Java file for OneCompiler. */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function javaToCompilerFiles(code) {
  const trimmed = code.trim();
  const publicClass = trimmed.match(/^public\s+class\s+(\w+)/m);
  const name = publicClass ? `${publicClass[1]}.java` : 'Main.java';
  return [{ name, content: trimmed }];
}

function extractRunDemos(source) {
  const demos = [];
  const re = /slug:\s*'([^']+)'[\s\S]*?runDemo:\s*`([\s\S]*?)`/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    demos.push({ slug: m[1], code: m[2] });
  }
  return demos;
}

const overridesPath = join(import.meta.dirname, '..', 'src/data/patterns/pattern-overrides.ts');
const behavioralPath = join(import.meta.dirname, '..', 'src/data/patterns/behavioral.ts');
let failed = 0;

for (const path of [overridesPath, behavioralPath]) {
  const text = readFileSync(path, 'utf8');
  for (const { slug, code } of extractRunDemos(text)) {
    const files = javaToCompilerFiles(code);
    if (files.length !== 1) {
      console.error(`FAIL ${slug}: ${files.length} files — OneCompiler Run will break`);
      failed++;
    }
    if (!/public\s+static\s+void\s+main\s*\(/m.test(files[0].content)) {
      console.error(`FAIL ${slug}: bundled file missing main()`);
      failed++;
    }
  }
}

if (failed > 0) process.exit(1);
console.log('OK — all runDemo snippets bundle to a single Java file with main().');
