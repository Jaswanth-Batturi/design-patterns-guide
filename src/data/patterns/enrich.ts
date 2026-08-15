import type { Pattern } from './types';

export interface EnrichedPattern extends Pattern {
  sceneSteps: string[];
  withoutPatternPains: string[];
  withPatternWins: string[];
  codeTakeaway: string;
  tryItSteps: string[];
  runDemo: string;
}

const DEFAULT_TRY_STEPS = [
  'Wait until the editor appears below (about 2 seconds).',
  'Read the code — it is a smaller runnable version of the pattern.',
  'Click the green Run ▶ button inside the editor (top-right of the code box).',
  'Read the output. Then change one line (e.g. add another listener) and Run again.',
];

function sceneFromAnalogy(analogy: string): string[] {
  const chunks = analogy
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 12);
  if (chunks.length >= 2) return chunks.slice(0, 3);
  return [
    'Imagine a normal day-to-day situation.',
    analogy.split(/[—–-]/)[0]?.trim() || analogy.slice(0, 80),
    'That is the same problem this pattern solves in code.',
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
  return {
    ...pattern,
    sceneSteps: pattern.sceneSteps ?? sceneFromAnalogy(pattern.analogy),
    withoutPatternPains: pattern.withoutPatternPains ?? painsFromProblem(pattern.problem),
    withPatternWins: pattern.withPatternWins ?? winsFromSolution(pattern.solution),
    codeTakeaway:
      pattern.codeTakeaway ??
      `Without the pattern, code is harder to change — one class does too much or uses long if/else chains. With the pattern, each piece has one job and you can extend without rewriting everything.`,
    tryItSteps: pattern.tryItSteps ?? DEFAULT_TRY_STEPS,
    runDemo: pattern.runDemo ?? pattern.codeAfter,
  };
}
