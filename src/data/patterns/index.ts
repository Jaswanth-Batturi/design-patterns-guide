import { creationalPatterns } from './creational';
import { structuralPatterns } from './structural';
import { behavioralPatterns } from './behavioral';
import type { Pattern } from './types';
import { categoryLabels } from './types';

export type { Pattern, PatternCategory, QuizQuestion } from './types';
export { categoryLabels, categoryHints } from './types';

/** All 23 GoF patterns in a stable learning order. */
export const patterns: Pattern[] = [
  ...creationalPatterns,
  ...structuralPatterns,
  ...behavioralPatterns,
];

export function getPattern(slug: string): Pattern | undefined {
  return patterns.find((p) => p.slug === slug);
}

export { enrichPattern } from './enrich';
export type { EnrichedPattern } from './enrich';

export interface FinderRule {
  keywords: string[];
  patternSlug: string;
  hint: string;
}

export const finderRules: FinderRule[] = [
  { keywords: ['single', 'singleton', 'one instance', 'global', 'shared config'], patternSlug: 'singleton', hint: 'Exactly one shared instance for the whole app' },
  { keywords: ['create', 'factory', 'instantiate', 'new object', 'constructor', 'product'], patternSlug: 'factory', hint: 'Let subclasses or a factory decide which class to instantiate' },
  { keywords: ['family', 'abstract factory', 'theme', 'ui kit', 'platform', 'suite'], patternSlug: 'abstract-factory', hint: 'Create families of related objects without naming concrete classes' },
  { keywords: ['builder', 'step', 'assemble', 'complex object', 'fluent', 'lombok'], patternSlug: 'builder', hint: 'Build complex objects step by step' },
  { keywords: ['clone', 'copy', 'prototype', 'duplicate', 'cloneable'], patternSlug: 'prototype', hint: 'Copy existing objects instead of rebuilding from scratch' },
  { keywords: ['adapt', 'adapter', 'incompatible', 'legacy', 'plug', 'convert interface'], patternSlug: 'adapter', hint: 'Make an existing class work with an interface clients expect' },
  { keywords: ['bridge', 'abstraction', 'implementation', 'platform independent'], patternSlug: 'bridge', hint: 'Split abstraction and implementation so both can vary' },
  { keywords: ['tree', 'composite', 'folder', 'hierarchy', 'parent child', 'component'], patternSlug: 'composite', hint: 'Treat individual objects and groups uniformly' },
  { keywords: ['wrap', 'layer', 'addon', 'decorate', 'stack', 'buffer', 'stream'], patternSlug: 'decorator', hint: 'Add features by wrapping without subclass explosion' },
  { keywords: ['facade', 'simplify', 'subsystem', 'front desk', 'api gateway', 'wrapper api'], patternSlug: 'facade', hint: 'One simple entry point to a complex subsystem' },
  { keywords: ['flyweight', 'cache', 'shared', 'memory', 'glyph', 'pool identical'], patternSlug: 'flyweight', hint: 'Share intrinsic state across many fine-grained objects' },
  { keywords: ['proxy', 'lazy', 'access control', 'placeholder', 'surrogate', 'remote'], patternSlug: 'proxy', hint: 'Control access to another object via a stand-in' },
  { keywords: ['chain', 'pipeline', 'handler', 'middleware', 'pass request', 'approval'], patternSlug: 'chain-of-responsibility', hint: 'Pass a request along a chain until someone handles it' },
  { keywords: ['command', 'undo', 'queue', 'order slip', 'action', 'macro'], patternSlug: 'command', hint: 'Encapsulate requests as objects — great for undo/redo' },
  { keywords: ['interpret', 'grammar', 'expression', 'parse', 'language', 'rule'], patternSlug: 'interpreter', hint: 'Define a grammar and interpret sentences in it' },
  { keywords: ['iterate', 'iterator', 'collection', 'foreach', 'cursor', 'sequence'], patternSlug: 'iterator', hint: 'Traverse a collection without exposing its internals' },
  { keywords: ['mediator', 'chat', 'hub', 'coordinate', 'central', 'air traffic'], patternSlug: 'mediator', hint: 'Central hub so objects don\'t talk to each other directly' },
  { keywords: ['memento', 'snapshot', 'undo state', 'history', 'save restore'], patternSlug: 'memento', hint: 'Capture and restore object state without breaking encapsulation' },
  { keywords: ['notify', 'subscribe', 'listen', 'event', 'observer', 'update', 'publish'], patternSlug: 'observer', hint: 'One source, many listeners that react to changes' },
  { keywords: ['state', 'mode', 'traffic light', 'context switch', 'lifecycle'], patternSlug: 'state', hint: 'Object behavior changes when its internal state changes' },
  { keywords: ['algorithm', 'behavior', 'payment', 'sort', 'strategy', 'swap', 'switch method'], patternSlug: 'strategy', hint: 'Interchangeable behaviors behind one interface' },
  { keywords: ['template', 'skeleton', 'hook', 'recipe steps', 'override step'], patternSlug: 'template-method', hint: 'Define algorithm skeleton; subclasses fill in steps' },
  { keywords: ['visitor', 'double dispatch', 'traverse', 'operations on tree', 'tax export'], patternSlug: 'visitor', hint: 'Add new operations across object structures without changing classes' },
];
