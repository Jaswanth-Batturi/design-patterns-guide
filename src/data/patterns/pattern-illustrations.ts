/** Simple inline SVG scenes — one visual per pattern (real-life analogy). */
export const patternIllustrations: Record<string, { label: string; svg: string }> = {
  singleton: {
    label: 'One electric meter for the whole building',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="8" y="20" width="100" height="70" rx="4" fill="#1e293b" stroke="#475569"/><rect x="20" y="32" width="18" height="14" fill="#334155"/><rect x="44" y="32" width="18" height="14" fill="#334155"/><rect x="68" y="32" width="18" height="14" fill="#334155"/><circle cx="130" cy="50" r="28" fill="#312e81" stroke="#6366f1" stroke-width="2"/><text x="130" y="55" text-anchor="middle" fill="#a5b4fc" font-size="11" font-family="system-ui">1 meter</text></svg>`,
  },
  factory: {
    label: 'Order at the table — kitchen builds it',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="10" y="55" width="50" height="30" rx="4" fill="#1e293b" stroke="#475569"/><text x="35" y="74" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="system-ui">table</text><rect x="90" y="15" width="55" height="45" rx="4" fill="#312e81" stroke="#6366f1"/><text x="117" y="42" text-anchor="middle" fill="#c7d2fe" font-size="9" font-family="system-ui">kitchen</text><path d="M60 70 L90 50" stroke="#6366f1" stroke-width="2" marker-end="url(#a)"/><defs><marker id="a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#6366f1"/></marker></defs></svg>`,
  },
  'abstract-factory': {
    label: 'Pick a matching furniture set',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="15" y="25" width="35" height="25" rx="3" fill="#6366f1" opacity=".8"/><rect x="15" y="55" width="35" height="25" rx="3" fill="#6366f1" opacity=".5"/><rect x="90" y="25" width="35" height="25" rx="3" fill="#64748b"/><rect x="90" y="55" width="35" height="25" rx="3" fill="#64748b" opacity=".5"/><text x="32" y="18" fill="#94a3b8" font-size="8" font-family="system-ui">Modern</text><text x="107" y="18" fill="#94a3b8" font-size="8" font-family="system-ui">Victorian</text></svg>`,
  },
  builder: {
    label: 'Build a sandwich layer by layer',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="55" y="70" width="50" height="8" rx="2" fill="#d97706"/><rect x="55" y="58" width="50" height="10" rx="2" fill="#b45309"/><rect x="55" y="48" width="50" height="8" rx="2" fill="#fcd34d"/><rect x="55" y="38" width="50" height="8" rx="2" fill="#d97706"/><text x="80" y="30" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">layers</text></svg>`,
  },
  prototype: {
    label: 'Photocopy instead of rewriting',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="20" y="25" width="45" height="55" rx="2" fill="#1e293b" stroke="#475569"/><rect x="75" y="25" width="45" height="55" rx="2" fill="#1e293b" stroke="#6366f1" stroke-dasharray="4"/><text x="42" y="55" fill="#94a3b8" font-size="8" font-family="system-ui">original</text><text x="97" y="55" fill="#a5b4fc" font-size="8" font-family="system-ui">copy</text></svg>`,
  },
  adapter: {
    label: 'Travel plug adapts the shape',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="15" y="40" width="30" height="30" rx="4" fill="#1e293b" stroke="#475569"/><rect x="70" y="35" width="25" height="40" rx="3" fill="#6366f1"/><rect x="110" y="40" width="30" height="30" rx="4" fill="#1e293b" stroke="#475569"/></svg>`,
  },
  bridge: {
    label: 'Remote works with any TV',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="15" y="45" width="40" height="25" rx="3" fill="#312e81" stroke="#6366f1"/><rect x="95" y="30" width="45" height="35" rx="3" fill="#1e293b" stroke="#475569"/><circle cx="70" cy="57" r="8" fill="#6366f1"/></svg>`,
  },
  composite: {
    label: 'Folder contains files and folders',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><path d="M20 35 L55 35 L65 45 L130 45 L130 80 L20 80 Z" fill="#312e81" stroke="#6366f1"/><rect x="35" y="55" width="30" height="8" fill="#475569"/><rect x="35" y="65" width="40" height="8" fill="#475569"/></svg>`,
  },
  decorator: {
    label: 'Coffee with stacked addons',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><ellipse cx="80" cy="75" rx="28" ry="8" fill="#475569"/><rect x="62" y="45" width="36" height="30" rx="4" fill="#1e293b" stroke="#6366f1"/><rect x="58" y="38" width="44" height="8" rx="2" fill="#fcd34d" opacity=".8"/><rect x="54" y="30" width="52" height="8" rx="2" fill="#f472b6" opacity=".6"/></svg>`,
  },
  facade: {
    label: 'Front desk handles everything',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="50" y="25" width="60" height="50" rx="4" fill="#312e81" stroke="#6366f1"/><text x="80" y="52" text-anchor="middle" fill="#c7d2fe" font-size="9" font-family="system-ui">desk</text><rect x="15" y="40" width="25" height="20" rx="2" fill="#334155"/><rect x="125" y="35" width="25" height="25" rx="2" fill="#334155"/></svg>`,
  },
  flyweight: {
    label: 'One glyph reused many times',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><circle cx="50" cy="50" r="22" fill="#312e81" stroke="#6366f1"/><text x="50" y="55" text-anchor="middle" fill="#c7d2fe" font-size="20" font-family="system-ui">A</text><text x="95" y="40" fill="#94a3b8" font-size="14" font-family="system-ui">A</text><text x="110" y="65" fill="#94a3b8" font-size="14" font-family="system-ui">A</text><text x="125" y="45" fill="#94a3b8" font-size="14" font-family="system-ui">A</text></svg>`,
  },
  proxy: {
    label: 'Assistant screens your calls',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><circle cx="45" cy="50" r="22" fill="#312e81" stroke="#6366f1"/><circle cx="110" cy="50" r="22" fill="#1e293b" stroke="#475569"/><path d="M67 50 L88 50" stroke="#6366f1" stroke-width="2"/></svg>`,
  },
  'chain-of-responsibility': {
    label: 'Ticket escalates through support tiers',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="10" y="40" width="35" height="30" rx="3" fill="#334155"/><rect x="55" y="40" width="35" height="30" rx="3" fill="#475569"/><rect x="100" y="40" width="35" height="30" rx="3" fill="#6366f1"/><path d="M45 55 L55 55 M90 55 L100 55" stroke="#94a3b8" stroke-width="2"/></svg>`,
  },
  command: {
    label: 'Order ticket to the kitchen',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="25" y="30" width="40" height="50" rx="2" fill="#fef3c7" stroke="#d97706"/><line x1="32" y1="45" x2="58" y2="45" stroke="#92400e"/><line x1="32" y1="55" x2="58" y2="55" stroke="#92400e"/><rect x="95" y="35" width="45" height="40" rx="3" fill="#312e81" stroke="#6366f1"/></svg>`,
  },
  interpreter: {
    label: 'Music symbols follow grammar rules',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><ellipse cx="40" cy="70" rx="8" ry="6" fill="#6366f1"/><line x1="48" y1="70" x2="48" y2="30" stroke="#a5b4fc" stroke-width="2"/><ellipse cx="70" cy="55" rx="8" ry="6" fill="#6366f1"/><line x1="78" y1="55" x2="78" y2="25" stroke="#a5b4fc" stroke-width="2"/><ellipse cx="100" cy="65" rx="8" ry="6" fill="#6366f1"/></svg>`,
  },
  iterator: {
    label: 'Next track without seeing the playlist storage',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="40" y="25" width="80" height="50" rx="4" fill="#1e293b" stroke="#475569"/><polygon points="75,40 75,60 90,50" fill="#6366f1"/><rect x="50" y="35" width="20" height="4" fill="#475569"/><rect x="50" y="45" width="15" height="4" fill="#475569"/></svg>`,
  },
  mediator: {
    label: 'Air traffic control coordinates planes',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><circle cx="80" cy="50" r="18" fill="#312e81" stroke="#6366f1"/><circle cx="30" cy="30" r="10" fill="#475569"/><circle cx="130" cy="30" r="10" fill="#475569"/><circle cx="30" cy="75" r="10" fill="#475569"/><line x1="40" y1="35" x2="65" y2="45" stroke="#6366f1"/><line x1="120" y1="35" x2="95" y2="45" stroke="#6366f1"/></svg>`,
  },
  memento: {
    label: 'Game save checkpoint',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="50" y="30" width="60" height="45" rx="4" fill="#1e293b" stroke="#6366f1"/><text x="80" y="55" text-anchor="middle" fill="#a5b4fc" font-size="10" font-family="system-ui">SAVE</text><path d="M30 70 L50 70" stroke="#94a3b8" stroke-width="2"/><polygon points="25,70 30,65 30,75" fill="#94a3b8"/></svg>`,
  },
  observer: {
    label: 'Newsletter when blog publishes',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="20" y="25" width="50" height="40" rx="3" fill="#312e81" stroke="#6366f1"/><rect x="95" y="30" width="40" height="25" rx="2" fill="#1e293b" stroke="#475569"/><rect x="95" y="60" width="40" height="25" rx="2" fill="#1e293b" stroke="#475569"/><path d="M70 45 L95 42 M70 50 L95 72" stroke="#6366f1" stroke-width="1.5"/></svg>`,
  },
  state: {
    label: 'Traffic light changes behavior',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="65" y="15" width="30" height="70" rx="8" fill="#1e293b" stroke="#475569"/><circle cx="80" cy="32" r="8" fill="#22c55e"/><circle cx="80" cy="52" r="8" fill="#eab308" opacity=".5"/><circle cx="80" cy="72" r="8" fill="#ef4444" opacity=".5"/></svg>`,
  },
  strategy: {
    label: 'Pick payment method at checkout',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="30" y="35" width="100" height="40" rx="4" fill="#1e293b" stroke="#475569"/><rect x="40" y="45" width="35" height="20" rx="2" fill="#312e81" stroke="#6366f1"/><rect x="85" y="45" width="35" height="20" rx="2" fill="#334155"/></svg>`,
  },
  'template-method': {
    label: 'Same steps, different brew',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="25" y="40" width="35" height="35" rx="3" fill="#92400e" opacity=".6"/><rect x="80" y="40" width="35" height="35" rx="3" fill="#1e293b" stroke="#475569"/><path d="M42 30 L42 40 M97 30 L97 40" stroke="#94a3b8"/><text x="42" y="25" font-size="7" fill="#94a3b8" font-family="system-ui">heat</text></svg>`,
  },
  visitor: {
    label: 'Auditor visits each department',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><circle cx="40" cy="50" r="18" fill="#312e81" stroke="#6366f1"/><rect x="75" y="25" width="30" height="25" rx="2" fill="#334155"/><rect x="75" y="55" width="30" height="25" rx="2" fill="#334155"/><path d="M58 50 L75 37 M58 52 L75 67" stroke="#6366f1"/></svg>`,
  },
};

export function getIllustration(slug: string, icon: string) {
  return patternIllustrations[slug] ?? {
    label: 'Real-life analogy',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><text x="80" y="55" text-anchor="middle" fill="#a5b4fc" font-size="32" font-family="system-ui">${icon}</text></svg>`,
  };
}
