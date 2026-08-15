import type { Pattern } from './types';
import { patternEnrichment } from './pattern-overrides';

export interface EnrichedPattern extends Pattern {
  sceneSteps: string[];
  withoutPatternPains: string[];
  withPatternWins: string[];
  codeTakeaway: string;
  tryItSteps: string[];
  runDemo: string;
  codeBeforeHint: string;
  codeAfterHint: string;
}

const DEFAULT_TRY_STEPS = [
  'Wait until the editor appears below (about 2 seconds).',
  'Read the short demo — it is simpler than the full example above.',
  'Click the green Run ▶ button inside the editor (top-right of the code box).',
  'Read the output, then change one line and Run again to see the effect.',
];

function sceneFromAnalogy(analogy: string): string[] {
  const chunks = analogy
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 12);
  if (chunks.length >= 2) return chunks.slice(0, 3);
  return [
    'Picture an everyday situation you already know.',
    analogy.split(/[—–-]/)[0]?.trim() || analogy.slice(0, 80),
    'That same tension shows up in code — this pattern resolves it.',
  ];
}

function painsFromProblem(problem: string): string[] {
  return problem
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15)
    .slice(0, 3);
}

function winsFromSolution(solution: string): string[] {
  return solution
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15)
    .slice(0, 3);
}

export function enrichPattern(pattern: Pattern): EnrichedPattern {
  const override = patternEnrichment[pattern.slug];

  return {
    ...pattern,
    sceneSteps: pattern.sceneSteps ?? override?.sceneSteps ?? sceneFromAnalogy(pattern.analogy),
    withoutPatternPains:
      pattern.withoutPatternPains ?? override?.withoutPatternPains ?? painsFromProblem(pattern.problem),
    withPatternWins: pattern.withPatternWins ?? override?.withPatternWins ?? winsFromSolution(pattern.solution),
    codeTakeaway:
      pattern.codeTakeaway ??
      override?.codeTakeaway ??
      `Without the pattern, one class does too much or if/else chains grow. With ${pattern.name}, each piece has one job and you extend without rewriting everything.`,
    tryItSteps: pattern.tryItSteps ?? override?.tryItSteps ?? DEFAULT_TRY_STEPS,
    runDemo: pattern.runDemo ?? override?.runDemo ?? pattern.codeAfter,
    codeBeforeHint:
      override?.codeBeforeHint ?? 'Notice tight coupling and code that is hard to extend.',
    codeAfterHint:
      override?.codeAfterHint ?? 'Notice separated roles — add behavior without breaking old code.',
  };
}
