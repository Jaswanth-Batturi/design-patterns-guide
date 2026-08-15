import type { Pattern } from './types';
import { patternEnrichment } from './pattern-overrides';
import { patternStories, type PatternStory } from './pattern-stories';
import { patternCodeSnippets } from './pattern-code-snippets';
import { deriveRunExpect } from '../../utils/run-expect';

export interface EnrichedPattern extends Pattern {
  exampleName: string;
  sceneSteps: [string, string, string];
  withoutPatternPains: [string, string, string];
  withPatternWins: [string, string, string];
  codeBridge: string;
  runExpect: string;
  tryItSteps: string[];
  codeTakeaway: string;
  runDemo: string;
  codeBeforeHint: string;
  codeAfterHint: string;
  displayCodeBefore: string;
  displayCodeAfter: string;
}

function tuple3(items: string[]): [string, string, string] {
  return [items[0] ?? '', items[1] ?? '', items[2] ?? ''];
}

function storyFor(pattern: Pattern): PatternStory {
  const story = patternStories[pattern.slug];
  if (story) return story;

  return {
    example: pattern.name,
    scene: tuple3(
      pattern.analogy
        .split(/[.!?]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 8)
        .slice(0, 3),
    ),
    without: tuple3(
      pattern.problem
        .split(/(?<=[.!?])\s+/)
        .filter((s) => s.length > 12)
        .slice(0, 3),
    ),
    with: tuple3(
      pattern.solution
        .split(/(?<=[.!?])\s+/)
        .filter((s) => s.length > 12)
        .slice(0, 3),
    ),
    codeBridge: `See how ${pattern.name} fixes this in the code below.`,
    codeBeforeHint: 'Without the pattern — messy, coupled, hard to extend.',
    codeAfterHint: 'With the pattern — same example, cleaner structure.',
    tryItSteps: ['Wait for the editor, click Run ▶, compare output below.'],
  };
}

export function enrichPattern(pattern: Pattern): EnrichedPattern {
  const override = patternEnrichment[pattern.slug];
  const story = storyFor(pattern);
  const snippets = patternCodeSnippets[pattern.slug];
  const runDemo = pattern.runDemo ?? override?.runDemo ?? pattern.codeAfter;

  return {
    ...pattern,
    exampleName: story.example,
    sceneSteps: story.scene,
    withoutPatternPains: story.without,
    withPatternWins: story.with,
    codeBridge: story.codeBridge,
    runExpect: deriveRunExpect(runDemo),
    tryItSteps: story.tryItSteps,
    displayCodeBefore: snippets?.before ?? pattern.codeBefore,
    displayCodeAfter: snippets?.after ?? pattern.codeAfter,
    codeTakeaway: story.codeBridge,
    runDemo,
    codeBeforeHint: story.codeBeforeHint,
    codeAfterHint: story.codeAfterHint,
  };
}
