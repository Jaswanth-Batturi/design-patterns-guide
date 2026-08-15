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
  oneLiner: string;
  analogy: string;
  analogyIcon: string;
  problem: string;
  solution: string;
  whenToUse: string[];
  whenNotToUse: string[];
  relatedPatterns: string[];
  codeBefore: string;
  codeAfter: string;
  quiz: QuizQuestion[];
}

export const categoryLabels: Record<PatternCategory, string> = {
  creational: 'Creational',
  structural: 'Structural',
  behavioral: 'Behavioral',
};
