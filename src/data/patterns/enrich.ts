import type { Pattern } from './types';
import { patternEnrichment } from './pattern-overrides';
import { patternStories, type PatternStory } from './pattern-stories';
import { patternCodeSnippets } from './pattern-code-snippets';

export interface EnrichedPattern extends Pattern {
  sceneSteps: [string, string, string];
  withoutPatternPains: [string, string, string];
  withPatternWins: [string, string, string];
  codeBridge: string;
  runExpect: string;
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
    runExpect: 'Check the console output',
  };
}

export function enrichPattern(pattern: Pattern): EnrichedPattern {
  const override = patternEnrichment[pattern.slug];
  const story = storyFor(pattern);
  const snippets = patternCodeSnippets[pattern.slug];

  return {
    ...pattern,
    sceneSteps: story.scene,
    withoutPatternPains: story.without,
    withPatternWins: story.with,
    codeBridge: story.codeBridge,
    runExpect: story.runExpect,
    displayCodeBefore: snippets?.before ?? pattern.codeBefore,
    displayCodeAfter: snippets?.after ?? pattern.codeAfter,
    codeTakeaway: pattern.codeTakeaway ?? override?.codeTakeaway ?? story.codeBridge,
    runDemo: pattern.runDemo ?? override?.runDemo ?? pattern.codeAfter,
    codeBeforeHint: override?.codeBeforeHint ?? 'The painful version — notice repetition and coupling.',
    codeAfterHint: override?.codeAfterHint ?? 'The pattern version — same idea, cleaner structure.',
  };
}
