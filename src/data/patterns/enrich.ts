import type { Pattern } from './types';
import { patternEnrichment } from './pattern-overrides';
import { patternStories, type PatternStory } from './pattern-stories';

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
}

function tuple3(items: string[]): [string, string, string] {
  return [items[0] ?? '', items[1] ?? '', items[2] ?? ''];
}

function storyFor(pattern: Pattern): PatternStory {
  const story = patternStories[pattern.slug];
  if (story) return story;

  return {
    scene: tuple3(
      pattern.sceneSteps ??
        pattern.analogy
          .split(/[.!?]+/)
          .map((s) => s.trim())
          .filter((s) => s.length > 8)
          .slice(0, 3),
    ),
    without: tuple3(
      pattern.withoutPatternPains ??
        pattern.problem
          .split(/(?<=[.!?])\s+/)
          .filter((s) => s.length > 12)
          .slice(0, 3),
    ),
    with: tuple3(
      pattern.withPatternWins ??
        pattern.solution
          .split(/(?<=[.!?])\s+/)
          .filter((s) => s.length > 12)
          .slice(0, 3),
    ),
    codeBridge: `See how "${pattern.name}" fixes the problem in the code tabs below.`,
    runExpect: 'Output printed in the console',
  };
}

export function enrichPattern(pattern: Pattern): EnrichedPattern {
  const override = patternEnrichment[pattern.slug];
  const story = storyFor(pattern);

  return {
    ...pattern,
    sceneSteps: story.scene,
    withoutPatternPains: story.without,
    withPatternWins: story.with,
    codeBridge: story.codeBridge,
    runExpect: story.runExpect,
    codeTakeaway:
      pattern.codeTakeaway ??
      override?.codeTakeaway ??
      story.codeBridge,
    runDemo: pattern.runDemo ?? override?.runDemo ?? pattern.codeAfter,
    codeBeforeHint:
      override?.codeBeforeHint ?? 'This is the messy version — notice duplication and coupling.',
    codeAfterHint:
      override?.codeAfterHint ?? 'This is the pattern version — same story, cleaner structure.',
  };
}
