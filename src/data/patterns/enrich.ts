import type { Pattern } from './types';
import { patternEnrichment } from './pattern-overrides';
import { patternStories, type PatternStory } from './pattern-stories';
import { deriveRunExpect } from '../../utils/run-expect';

export interface EnrichedPattern extends Pattern {
  exampleName: string;
  overview: string;
  problemStatement: string;
  tradeoffIntro: string;
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
    overview: pattern.analogy,
    problemStatement: pattern.problem,
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
    tradeoffIntro: `Here is how the example plays out in code without and with ${pattern.name}.`,
  };
}

export function enrichPattern(pattern: Pattern): EnrichedPattern {
  const override = patternEnrichment[pattern.slug];
  const story = storyFor(pattern);
  const runDemo = pattern.runDemo ?? override?.runDemo ?? pattern.codeAfter;

  const overview =
    story.overview ??
    `${story.example}: ${story.scene[0]} ${story.scene[1]}`.trim();

  const tradeoffIntro =
    story.tradeoffIntro ??
    `We stay with the same example (${story.example}) and show what happens in Java when you skip ${pattern.name} versus when you use it properly.`;

  return {
    ...pattern,
    exampleName: story.example,
    overview,
    problemStatement: story.problemStatement ?? pattern.problem,
    tradeoffIntro,
    sceneSteps: story.scene,
    withoutPatternPains: story.without,
    withPatternWins: story.with,
    codeBridge: story.codeBridge,
    runExpect: deriveRunExpect(runDemo),
    tryItSteps: story.tryItSteps,
    displayCodeBefore: pattern.codeBefore,
    displayCodeAfter: pattern.codeAfter,
    codeTakeaway: story.codeBridge,
    runDemo,
    codeBeforeHint: story.codeBeforeHint,
    codeAfterHint: story.codeAfterHint,
  };
}
