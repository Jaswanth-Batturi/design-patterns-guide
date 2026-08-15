export type PatternCategory = 'creational' | 'structural' | 'behavioral';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Pattern {
  slug: string;
  name: string;
  category: PatternCategory;
  /** One sentence: what this pattern does. */
  oneLiner: string;
  /** Full analogy paragraph. */
  analogy: string;
  analogyIcon: string;
  /** Optional: 3 short steps for the pictorial scene (daily life). */
  sceneSteps?: string[];
  problem: string;
  solution: string;
  /** Plain-language pains when you skip the pattern. */
  withoutPatternPains?: string[];
  /** Plain-language wins when you apply the pattern. */
  withPatternWins?: string[];
  /** What to look for when comparing the two code blocks. */
  codeTakeaway?: string;
  whenToUse: string[];
  whenNotToUse: string[];
  relatedPatterns: string[];
  codeBefore: string;
  codeAfter: string;
  /** Short runnable demo — clearer than full codeAfter for the exercise. */
  runDemo?: string;
  /** Steps for the Java exercise section. */
  tryItSteps?: string[];
  quiz: QuizQuestion[];
}

export const categoryLabels: Record<PatternCategory, string> = {
  creational: 'Creational',
  structural: 'Structural',
  behavioral: 'Behavioral',
};

export const categoryHints: Record<PatternCategory, string> = {
  creational: 'How objects are created',
  structural: 'How objects are composed',
  behavioral: 'How objects communicate',
};
