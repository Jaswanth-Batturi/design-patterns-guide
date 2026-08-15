/** Inline SVG scenes — one visual per pattern (matches pattern-stories metaphor). */
export const patternIllustrations: Record<string, { label: string; svg: string }> = {
  singleton: {
    label: 'One Wi‑Fi router — every device joins the same network',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="62" y="38" width="36" height="22" rx="4" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/><path d="M70 38 L80 28 L90 38" stroke="#6366f1" fill="none"/><circle cx="80" cy="49" r="3" fill="#a5b4fc"/><circle cx="28" cy="62" r="10" fill="#1e293b" stroke="#475569"/><circle cx="128" cy="58" r="10" fill="#1e293b" stroke="#475569"/><circle cx="80" cy="78" r="9" fill="#1e293b" stroke="#475569"/><path d="M38 58 L62 48 M122 54 L98 48 M80 69 L80 60" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="3 2"/></svg>`,
  },
  factory: {
    label: 'Order at the counter — kitchen builds your drink',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="10" y="55" width="50" height="30" rx="4" fill="#1e293b" stroke="#475569"/><text x="35" y="74" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">order</text><rect x="90" y="15" width="55" height="45" rx="4" fill="#312e81" stroke="#6366f1"/><text x="117" y="42" text-anchor="middle" fill="#c7d2fe" font-size="8" font-family="system-ui">kitchen</text><path d="M60 70 L90 50" stroke="#6366f1" stroke-width="2"/></svg>`,
  },
  'abstract-factory': {
    label: 'Pick a matched furniture set — whole room same style',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="15" y="25" width="35" height="25" rx="3" fill="#6366f1" opacity=".85"/><rect x="15" y="55" width="35" height="25" rx="3" fill="#6366f1" opacity=".55"/><rect x="90" y="25" width="35" height="25" rx="3" fill="#64748b"/><rect x="90" y="55" width="35" height="25" rx="3" fill="#64748b" opacity=".55"/><text x="32" y="18" fill="#a5b4fc" font-size="8" font-family="system-ui">Set A</text><text x="107" y="18" fill="#94a3b8" font-size="8" font-family="system-ui">Set B</text></svg>`,
  },
  builder: {
    label: 'Burrito counter — layer rice, beans, protein',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="55" y="72" width="50" height="8" rx="2" fill="#d97706"/><rect x="55" y="60" width="50" height="10" rx="2" fill="#b45309"/><rect x="55" y="50" width="50" height="8" rx="2" fill="#fcd34d"/><rect x="55" y="40" width="50" height="8" rx="2" fill="#22c55e" opacity=".7"/><text x="80" y="30" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">layers</text></svg>`,
  },
  prototype: {
    label: 'Duplicate a doc template — edit the copy',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="20" y="25" width="45" height="55" rx="2" fill="#1e293b" stroke="#475569"/><line x1="28" y1="38" x2="52" y2="38" stroke="#475569"/><line x1="28" y1="48" x2="48" y2="48" stroke="#475569"/><rect x="75" y="25" width="45" height="55" rx="2" fill="#1e293b" stroke="#6366f1" stroke-dasharray="4"/><text x="42" y="58" fill="#94a3b8" font-size="7" font-family="system-ui">template</text><text x="97" y="58" fill="#a5b4fc" font-size="7" font-family="system-ui">copy</text></svg>`,
  },
  adapter: {
    label: 'USB‑C dongle → HDMI projector',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="12" y="42" width="28" height="22" rx="3" fill="#1e293b" stroke="#475569"/><rect x="68" y="36" width="22" height="32" rx="3" fill="#6366f1"/><rect x="108" y="30" width="40" height="38" rx="3" fill="#1e293b" stroke="#475569"/><text x="128" y="52" text-anchor="middle" fill="#64748b" font-size="7" font-family="system-ui">HDMI</text><path d="M40 53 L68 53 M90 53 L108 53" stroke="#6366f1" stroke-width="2"/></svg>`,
  },
  bridge: {
    label: 'Same remote — any TV brand',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="12" y="44" width="44" height="28" rx="4" fill="#312e81" stroke="#6366f1"/><circle cx="26" cy="58" r="5" fill="#ef4444"/><circle cx="42" cy="58" r="5" fill="#22c55e"/><rect x="92" y="28" width="48" height="40" rx="3" fill="#1e293b" stroke="#475569"/><rect x="100" y="36" width="32" height="22" rx="1" fill="#0f172a"/><path d="M56 58 L92 48" stroke="#6366f1" stroke-width="2" stroke-dasharray="4 2"/></svg>`,
  },
  composite: {
    label: 'Folder holds files and subfolders',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><path d="M18 38 L52 38 L62 48 L138 48 L138 78 L18 78 Z" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/><rect x="32" y="56" width="36" height="7" rx="1" fill="#475569"/><rect x="32" y="66" width="48" height="7" rx="1" fill="#475569"/><path d="M78 56 L88 56 L94 62 L118 62 L118 72 L78 72 Z" fill="#1e293b" stroke="#64748b"/></svg>`,
  },
  decorator: {
    label: 'Stack insurance addons on a base plan',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="58" y="58" width="44" height="28" rx="4" fill="#1e293b" stroke="#6366f1"/><rect x="52" y="48" width="56" height="10" rx="2" fill="#38bdf8" opacity=".7"/><rect x="46" y="38" width="68" height="10" rx="2" fill="#a78bfa" opacity=".6"/><text x="80" y="30" text-anchor="middle" fill="#94a3b8" font-size="7" font-family="system-ui">+addons</text></svg>`,
  },
  facade: {
    label: 'One “Order food” tap — kitchen, pay, delivery',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="52" y="22" width="56" height="36" rx="6" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/><text x="78" y="44" text-anchor="middle" fill="#c7d2fe" font-size="8" font-family="system-ui">Order</text><rect x="14" y="62" width="32" height="22" rx="2" fill="#334155"/><rect x="62" y="62" width="32" height="22" rx="2" fill="#334155"/><rect x="110" y="62" width="32" height="22" rx="2" fill="#334155"/><path d="M78 58 L30 68 M78 58 L78 62 M78 58 L126 68" stroke="#6366f1" stroke-width="1.5"/></svg>`,
  },
  flyweight: {
    label: 'One glyph “A” reused across the document',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><circle cx="48" cy="50" r="24" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/><text x="48" y="56" text-anchor="middle" fill="#c7d2fe" font-size="22" font-family="system-ui">A</text><text x="92" y="38" fill="#94a3b8" font-size="14" font-family="system-ui">A</text><text x="108" y="62" fill="#94a3b8" font-size="14" font-family="system-ui">A</text><text x="124" y="44" fill="#94a3b8" font-size="14" font-family="system-ui">A</text><text x="100" y="78" fill="#64748b" font-size="7" font-family="system-ui">shared</text></svg>`,
  },
  proxy: {
    label: 'Thumbnail first — full video on Play',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="40" y="22" width="80" height="56" rx="4" fill="#1e293b" stroke="#475569"/><polygon points="72,42 72,58 88,50" fill="#6366f1"/><rect x="118" y="30" width="28" height="36" rx="2" fill="#312e81" stroke="#6366f1" stroke-dasharray="3"/><text x="132" y="50" text-anchor="middle" fill="#a5b4fc" font-size="7" font-family="system-ui">HD</text></svg>`,
  },
  'chain-of-responsibility': {
    label: 'Support ticket escalates tier by tier',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="8" y="40" width="38" height="32" rx="3" fill="#334155"/><text x="23" y="58" text-anchor="middle" fill="#94a3b8" font-size="7" font-family="system-ui">L1</text><rect x="54" y="40" width="38" height="32" rx="3" fill="#475569"/><text x="69" y="58" text-anchor="middle" fill="#94a3b8" font-size="7" font-family="system-ui">L2</text><rect x="100" y="40" width="38" height="32" rx="3" fill="#6366f1"/><text x="119" y="58" text-anchor="middle" fill="#e0e7ff" font-size="7" font-family="system-ui">Eng</text><path d="M46 56 L54 56 M92 56 L100 56" stroke="#94a3b8" stroke-width="2"/></svg>`,
  },
  command: {
    label: 'Waiter ticket → kitchen queue → undo',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="22" y="28" width="38" height="52" rx="2" fill="#fef3c7" stroke="#d97706"/><line x1="30" y1="42" x2="52" y2="42" stroke="#92400e"/><line x1="30" y1="54" x2="52" y2="54" stroke="#92400e"/><rect x="88" y="32" width="52" height="44" rx="3" fill="#312e81" stroke="#6366f1"/><text x="114" y="58" text-anchor="middle" fill="#c7d2fe" font-size="7" font-family="system-ui">queue</text></svg>`,
  },
  interpreter: {
    label: 'Calendar grammar: “every Monday 9am”',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="30" y="20" width="100" height="60" rx="4" fill="#1e293b" stroke="#475569"/><text x="80" y="42" text-anchor="middle" fill="#a5b4fc" font-size="9" font-family="system-ui">Mon 9:00</text><text x="80" y="58" text-anchor="middle" fill="#64748b" font-size="7" font-family="system-ui">grammar</text></svg>`,
  },
  iterator: {
    label: 'Next track — playlist storage hidden',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="38" y="24" width="84" height="52" rx="4" fill="#1e293b" stroke="#475569"/><polygon points="68,42 68,58 82,50" fill="#6366f1"/><rect x="48" y="34" width="22" height="4" fill="#475569"/><rect x="48" y="42" width="16" height="4" fill="#475569"/><circle cx="108" cy="50" r="10" fill="#312e81" stroke="#6366f1"/><path d="M104 50 L112 50" stroke="#c7d2fe"/><path d="M108 46 L108 54" stroke="#c7d2fe"/></svg>`,
  },
  mediator: {
    label: 'Air traffic tower coordinates planes',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><circle cx="80" cy="50" r="20" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/><text x="80" y="54" text-anchor="middle" fill="#c7d2fe" font-size="7" font-family="system-ui">tower</text><circle cx="28" cy="28" r="9" fill="#475569"/><circle cx="132" cy="28" r="9" fill="#475569"/><circle cx="28" cy="76" r="9" fill="#475569"/><line x1="37" y1="33" x2="62" y2="42" stroke="#6366f1"/><line x1="123" y1="33" x2="98" y2="42" stroke="#6366f1"/><line x1="37" y1="71" x2="62" y2="58" stroke="#6366f1"/></svg>`,
  },
  memento: {
    label: 'Game checkpoint save',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="48" y="28" width="64" height="48" rx="4" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="80" y="56" text-anchor="middle" fill="#a5b4fc" font-size="11" font-family="system-ui">SAVE</text><path d="M28 72 L48 72" stroke="#94a3b8" stroke-width="2"/><polygon points="22,72 28,67 28,77" fill="#94a3b8"/></svg>`,
  },
  observer: {
    label: 'Stock alert when price moves',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><polyline points="20,70 40,55 55,62 75,35 95,45 115,28" fill="none" stroke="#6366f1" stroke-width="2"/><rect x="100" y="48" width="44" height="28" rx="2" fill="#1e293b" stroke="#475569"/><rect x="100" y="22" width="44" height="22" rx="2" fill="#1e293b" stroke="#475569"/><path d="M75 40 L100 38 M75 45 L100 58" stroke="#6366f1" stroke-width="1.5"/></svg>`,
  },
  state: {
    label: 'Vending machine modes',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="62" y="14" width="36" height="72" rx="8" fill="#1e293b" stroke="#475569"/><circle cx="80" cy="32" r="8" fill="#22c55e"/><circle cx="80" cy="52" r="8" fill="#eab308" opacity=".6"/><circle cx="80" cy="72" r="8" fill="#ef4444" opacity=".5"/><text x="80" y="10" text-anchor="middle" fill="#64748b" font-size="7" font-family="system-ui">modes</text></svg>`,
  },
  strategy: {
    label: 'Checkout: pick card or UPI',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="28" y="34" width="104" height="42" rx="4" fill="#1e293b" stroke="#475569"/><rect x="38" y="44" width="38" height="22" rx="2" fill="#312e81" stroke="#6366f1"/><rect x="86" y="44" width="38" height="22" rx="2" fill="#334155"/><text x="57" y="58" text-anchor="middle" fill="#c7d2fe" font-size="7" font-family="system-ui">Card</text><text x="105" y="58" text-anchor="middle" fill="#94a3b8" font-size="7" font-family="system-ui">UPI</text></svg>`,
  },
  'template-method': {
    label: 'Tea and coffee share the same steps',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><rect x="22" y="42" width="34" height="34" rx="3" fill="#92400e" opacity=".65"/><rect x="76" y="42" width="34" height="34" rx="3" fill="#1e293b" stroke="#475569"/><path d="M39 32 L39 42 M87 32 L87 42" stroke="#94a3b8"/><text x="39" y="28" text-anchor="middle" fill="#94a3b8" font-size="7" font-family="system-ui">heat</text><text x="87" y="28" text-anchor="middle" fill="#94a3b8" font-size="7" font-family="system-ui">heat</text></svg>`,
  },
  visitor: {
    label: 'Tax auditor visits each department',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><circle cx="38" cy="50" r="18" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/><text x="38" y="54" text-anchor="middle" fill="#c7d2fe" font-size="7" font-family="system-ui">audit</text><rect x="72" y="22" width="32" height="26" rx="2" fill="#334155"/><rect x="72" y="56" width="32" height="26" rx="2" fill="#334155"/><path d="M56 44 L72 32 M56 52 L72 68" stroke="#6366f1" stroke-width="1.5"/></svg>`,
  },
};

export function getIllustration(slug: string, icon: string) {
  return patternIllustrations[slug] ?? {
    label: 'Real-life analogy',
    svg: `<svg viewBox="0 0 160 100" class="w-full h-auto" aria-hidden="true"><text x="80" y="55" text-anchor="middle" fill="#a5b4fc" font-size="32" font-family="system-ui">${icon}</text></svg>`,
  };
}
