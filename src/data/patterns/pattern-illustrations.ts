/** Inline SVG scenes — one visual per pattern (matches pattern-stories metaphor). */
export const patternIllustrations: Record<string, { label: string; svg: string }> = {
  singleton: {
    label: 'Home Wi‑Fi router — one network for every device',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-singleton" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#312e81"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-singleton)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#e0e7ff" font-size="9" font-family="system-ui" font-weight="600">Home Wi‑Fi router</text>
  <rect x="78" y="42" width="44" height="26" rx="5" fill="#1e1b4b" stroke="#a5b4fc" stroke-width="1.5"/>
  <path d="M88 42 L100 30 L112 42" stroke="#22c55e" stroke-width="2" fill="none"/>
  <circle cx="100" cy="55" r="4" fill="#22c55e"/>
  <circle cx="38" cy="78" r="12" fill="#06b6d4" opacity=".9"/>
  <circle cx="100" cy="92" r="11" fill="#ec4899" opacity=".85"/>
  <circle cx="162" cy="76" r="12" fill="#f59e0b" opacity=".9"/>
  <path d="M50 74 L78 58 M150 72 L122 58 M100 81 L100 68" stroke="#e0e7ff" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="38" y="82" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">phone</text>
  <text x="100" y="96" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">laptop</text>
  <text x="162" y="80" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">tablet</text>
</svg>`,
  },
  factory: {
    label: 'Coffee shop order — counter hands off to kitchen',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-factory" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-factory)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#fef3c7" font-size="9" font-family="system-ui" font-weight="600">Coffee shop order</text>
  <rect x="16" y="58" width="58" height="38" rx="5" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
  <text x="45" y="80" text-anchor="middle" fill="#c7d2fe" font-size="8" font-family="system-ui">counter</text>
  <rect x="118" y="28" width="66" height="52" rx="5" fill="#312e81" stroke="#22c55e" stroke-width="1.5"/>
  <text x="151" y="50" text-anchor="middle" fill="#bbf7d0" font-size="8" font-family="system-ui">kitchen</text>
  <rect x="132" y="58" width="18" height="14" rx="2" fill="#ec4899"/>
  <path d="M74 76 L118 58" stroke="#06b6d4" stroke-width="2.5" marker-end="url(#none)"/>
  <circle cx="90" cy="68" r="6" fill="#06b6d4"/>
  <text x="90" y="71" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">☕</text>
  <text x="45" y="104" text-anchor="middle" fill="#fef3c7" font-size="7" font-family="system-ui">"latte"</text>
</svg>`,
  },
  'abstract-factory': {
    label: 'Matched furniture set — whole room same style',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-abstract-factory" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4c1d95"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-abstract-factory)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#fce7f3" font-size="9" font-family="system-ui" font-weight="600">Matched furniture set</text>
  <text x="52" y="32" text-anchor="middle" fill="#c4b5fd" font-size="8" font-family="system-ui">Set A</text>
  <text x="148" y="32" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">Set B</text>
  <rect x="22" y="38" width="42" height="28" rx="4" fill="#6366f1"/>
  <rect x="22" y="72" width="42" height="28" rx="4" fill="#22c55e" opacity=".85"/>
  <rect x="68" y="38" width="42" height="28" rx="4" fill="#06b6d4" opacity=".85"/>
  <rect x="118" y="38" width="42" height="28" rx="4" fill="#64748b"/>
  <rect x="118" y="72" width="42" height="28" rx="4" fill="#475569"/>
  <rect x="164" y="38" width="22" height="62" rx="3" fill="#334155"/>
  <text x="52" y="56" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">sofa</text>
  <text x="52" y="90" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">table</text>
  <text x="89" y="56" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">lamp</text>
  <text x="139" y="56" text-anchor="middle" fill="#cbd5e1" font-size="7" font-family="system-ui">sofa</text>
  <text x="139" y="90" text-anchor="middle" fill="#cbd5e1" font-size="7" font-family="system-ui">table</text>
</svg>`,
  },
  builder: {
    label: 'Burrito counter — layer rice, beans, protein',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-builder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14532d"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-builder)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#dcfce7" font-size="9" font-family="system-ui" font-weight="600">Burrito counter</text>
  <rect x="62" y="88" width="76" height="10" rx="3" fill="#f59e0b"/>
  <text x="100" y="96" text-anchor="middle" fill="#78350f" font-size="6" font-family="system-ui">tortilla</text>
  <rect x="62" y="74" width="76" height="12" rx="3" fill="#ec4899" opacity=".9"/>
  <text x="100" y="83" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">protein</text>
  <rect x="62" y="60" width="76" height="12" rx="3" fill="#6366f1" opacity=".85"/>
  <text x="100" y="69" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">beans</text>
  <rect x="62" y="46" width="76" height="12" rx="3" fill="#fef3c7"/>
  <text x="100" y="55" text-anchor="middle" fill="#78350f" font-size="6" font-family="system-ui">rice</text>
  <rect x="62" y="32" width="76" height="12" rx="3" fill="#06b6d4" opacity=".8"/>
  <text x="100" y="41" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">salsa</text>
  <text x="100" y="112" text-anchor="middle" fill="#bbf7d0" font-size="7" font-family="system-ui">build step by step →</text>
</svg>`,
  },
  prototype: {
    label: 'Duplicate Google Doc — edit the copy',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-prototype" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e7490"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-prototype)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#ecfeff" font-size="9" font-family="system-ui" font-weight="600">Duplicate Google Doc</text>
  <rect x="22" y="30" width="52" height="68" rx="3" fill="#fff" stroke="#6366f1" stroke-width="1.5"/>
  <line x1="32" y1="46" x2="62" y2="46" stroke="#6366f1" stroke-width="2"/>
  <line x1="32" y1="58" x2="58" y2="58" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="32" y1="70" x2="60" y2="70" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="48" y="88" text-anchor="middle" fill="#6366f1" font-size="7" font-family="system-ui">original</text>
  <path d="M82 64 L108 64" stroke="#f59e0b" stroke-width="2.5"/>
  <polygon points="108,64 102,60 102,68" fill="#f59e0b"/>
  <rect x="118" y="30" width="52" height="68" rx="3" fill="#fff" stroke="#22c55e" stroke-width="2" stroke-dasharray="5 3"/>
  <line x1="128" y1="46" x2="158" y2="46" stroke="#22c55e" stroke-width="2"/>
  <line x1="128" y1="58" x2="154" y2="58" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="128" y1="70" x2="156" y2="70" stroke="#ec4899" stroke-width="1.5"/>
  <text x="144" y="88" text-anchor="middle" fill="#22c55e" font-size="7" font-family="system-ui">copy</text>
</svg>`,
  },
  adapter: {
    label: 'USB‑C to HDMI dongle — bridge two standards',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-adapter" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-adapter)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#e0e7ff" font-size="9" font-family="system-ui" font-weight="600">USB‑C to HDMI dongle</text>
  <rect x="14" y="48" width="34" height="28" rx="4" fill="#06b6d4" stroke="#22d3ee"/>
  <text x="31" y="66" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">USB‑C</text>
  <rect x="78" y="42" width="28" height="38" rx="5" fill="#f59e0b"/>
  <text x="92" y="64" text-anchor="middle" fill="#78350f" font-size="6" font-family="system-ui">dongle</text>
  <rect x="136" y="38" width="48" height="46" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="144" y="46" width="32" height="24" rx="2" fill="#0f172a"/>
  <text x="160" y="62" text-anchor="middle" fill="#22c55e" font-size="7" font-family="system-ui">HDMI</text>
  <path d="M48 62 L78 62 M106 62 L136 62" stroke="#ec4899" stroke-width="2.5"/>
</svg>`,
  },
  bridge: {
    label: 'TV remote + brands — same control, any TV',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-bridge" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#831843"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-bridge)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#fce7f3" font-size="9" font-family="system-ui" font-weight="600">TV remote + brands</text>
  <rect x="14" y="48" width="50" height="34" rx="6" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
  <circle cx="30" cy="65" r="6" fill="#ef4444"/>
  <circle cx="48" cy="65" r="6" fill="#22c55e"/>
  <text x="39" y="84" text-anchor="middle" fill="#c7d2fe" font-size="7" font-family="system-ui">remote</text>
  <rect x="108" y="28" width="38" height="34" rx="3" fill="#1e293b" stroke="#06b6d4" stroke-width="1.5"/>
  <rect x="116" y="36" width="22" height="16" rx="1" fill="#06b6d4" opacity=".6"/>
  <text x="127" y="72" text-anchor="middle" fill="#67e8f9" font-size="6" font-family="system-ui">Sony</text>
  <rect x="152" y="28" width="38" height="34" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <rect x="160" y="36" width="22" height="16" rx="1" fill="#f59e0b" opacity=".6"/>
  <text x="171" y="72" text-anchor="middle" fill="#fcd34d" font-size="6" font-family="system-ui">LG</text>
  <path d="M64 65 L108 45 M64 65 L108 62" stroke="#e0e7ff" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="100" y="100" text-anchor="middle" fill="#fbcfe8" font-size="7" font-family="system-ui">abstraction ↔ implementation</text>
</svg>`,
  },
  composite: {
    label: 'Project folder — files and subfolders together',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-composite" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#312e81"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-composite)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#ecfeff" font-size="9" font-family="system-ui" font-weight="600">Project folder</text>
  <path d="M18 42 L58 42 L68 52 L178 52 L178 96 L18 96 Z" fill="#6366f1" stroke="#a5b4fc" stroke-width="1.5"/>
  <text x="98" y="40" text-anchor="middle" fill="#e0e7ff" font-size="7" font-family="system-ui">/project</text>
  <rect x="32" y="64" width="48" height="10" rx="2" fill="#22c55e"/>
  <text x="56" y="72" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">readme.md</text>
  <rect x="32" y="78" width="56" height="10" rx="2" fill="#f59e0b"/>
  <text x="60" y="86" text-anchor="middle" fill="#78350f" font-size="6" font-family="system-ui">index.ts</text>
  <path d="M98 64 L108 64 L116 72 L158 72 L158 92 L98 92 Z" fill="#ec4899" opacity=".85"/>
  <text x="128" y="84" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">/src</text>
</svg>`,
  },
  decorator: {
    label: 'Insurance addons — stack extras on a base plan',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-decorator" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#581c87"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-decorator)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#f3e8ff" font-size="9" font-family="system-ui" font-weight="600">Insurance addons</text>
  <rect x="52" y="72" width="96" height="28" rx="5" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
  <text x="100" y="90" text-anchor="middle" fill="#c7d2fe" font-size="8" font-family="system-ui">base plan</text>
  <rect x="44" y="56" width="112" height="14" rx="3" fill="#06b6d4" opacity=".9"/>
  <text x="100" y="66" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">+ dental</text>
  <rect x="36" y="40" width="128" height="14" rx="3" fill="#22c55e" opacity=".85"/>
  <text x="100" y="50" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">+ vision</text>
  <rect x="28" y="24" width="144" height="14" rx="3" fill="#f59e0b" opacity=".9"/>
  <text x="100" y="34" text-anchor="middle" fill="#78350f" font-size="7" font-family="system-ui">+ roadside</text>
  <text x="100" y="112" text-anchor="middle" fill="#e9d5ff" font-size="7" font-family="system-ui">wrap layers without changing core</text>
</svg>`,
  },
  facade: {
    label: 'Food app Order button — one tap, many services',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-facade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-facade)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#fef3c7" font-size="9" font-family="system-ui" font-weight="600">Food app Order button</text>
  <rect x="62" y="24" width="76" height="40" rx="8" fill="#6366f1" stroke="#a5b4fc" stroke-width="2"/>
  <text x="100" y="50" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui" font-weight="700">Order</text>
  <rect x="14" y="78" width="48" height="28" rx="4" fill="#22c55e"/>
  <text x="38" y="96" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">kitchen</text>
  <rect x="76" y="78" width="48" height="28" rx="4" fill="#ec4899"/>
  <text x="100" y="96" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">payment</text>
  <rect x="138" y="78" width="48" height="28" rx="4" fill="#06b6d4"/>
  <text x="162" y="96" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">delivery</text>
  <path d="M88 64 L38 78 M100 64 L100 78 M112 64 L162 78" stroke="#fef3c7" stroke-width="1.5"/>
</svg>`,
  },
  flyweight: {
    label: 'Letter e in Word — one glyph, many instances',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-flyweight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#164e63"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-flyweight)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#ecfeff" font-size="9" font-family="system-ui" font-weight="600">Letter e in Word</text>
  <circle cx="52" cy="62" r="28" fill="#6366f1" stroke="#a5b4fc" stroke-width="2"/>
  <text x="52" y="72" text-anchor="middle" fill="#fff" font-size="32" font-family="Georgia, serif" font-weight="700">e</text>
  <text x="52" y="100" text-anchor="middle" fill="#a5b4fc" font-size="7" font-family="system-ui">shared glyph</text>
  <text x="108" y="44" fill="#22c55e" font-size="18" font-family="Georgia, serif">e</text>
  <text x="130" y="58" fill="#f59e0b" font-size="14" font-family="Georgia, serif">e</text>
  <text x="118" y="78" fill="#ec4899" font-size="20" font-family="Georgia, serif">e</text>
  <text x="158" y="52" fill="#6366f1" font-size="12" font-family="Georgia, serif">e</text>
  <text x="148" y="88" fill="#06b6d4" font-size="16" font-family="Georgia, serif">e</text>
  <text x="140" y="104" text-anchor="middle" fill="#67e8f9" font-size="7" font-family="system-ui">reused everywhere</text>
</svg>`,
  },
  proxy: {
    label: 'Netflix thumbnail Play — lightweight stand‑in for full video',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-proxy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-proxy)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#fce7f3" font-size="9" font-family="system-ui" font-weight="600">Netflix thumbnail Play</text>
  <rect x="28" y="28" width="96" height="68" rx="5" fill="#0f172a" stroke="#6366f1" stroke-width="1.5"/>
  <rect x="36" y="36" width="80" height="40" rx="2" fill="#312e81"/>
  <polygon points="72,48 72,68 90,58" fill="#22c55e"/>
  <text x="76" y="88" text-anchor="middle" fill="#a5b4fc" font-size="7" font-family="system-ui">thumbnail</text>
  <path d="M124 58 L148 58" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="148,58 142,54 142,62" fill="#f59e0b"/>
  <rect x="152" y="32" width="36" height="52" rx="3" fill="#1e293b" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4"/>
  <text x="170" y="52" text-anchor="middle" fill="#67e8f9" font-size="7" font-family="system-ui">full</text>
  <text x="170" y="64" text-anchor="middle" fill="#67e8f9" font-size="7" font-family="system-ui">video</text>
  <text x="100" y="112" text-anchor="middle" fill="#fbcfe8" font-size="7" font-family="system-ui">proxy defers heavy load</text>
</svg>`,
  },
  'chain-of-responsibility': {
    label: 'Support escalation — ticket moves tier by tier',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-chain-of-responsibility" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a5f"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-chain-of-responsibility)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#e0e7ff" font-size="9" font-family="system-ui" font-weight="600">Support escalation</text>
  <rect x="10" y="48" width="48" height="38" rx="4" fill="#06b6d4"/>
  <text x="34" y="64" text-anchor="middle" fill="#fff" font-size="8" font-family="system-ui">L1</text>
  <text x="34" y="78" text-anchor="middle" fill="#ecfeff" font-size="6" font-family="system-ui">chat bot</text>
  <rect x="68" y="48" width="48" height="38" rx="4" fill="#f59e0b"/>
  <text x="92" y="64" text-anchor="middle" fill="#78350f" font-size="8" font-family="system-ui">L2</text>
  <text x="92" y="78" text-anchor="middle" fill="#78350f" font-size="6" font-family="system-ui">agent</text>
  <rect x="126" y="48" width="48" height="38" rx="4" fill="#22c55e"/>
  <text x="150" y="64" text-anchor="middle" fill="#fff" font-size="8" font-family="system-ui">Eng</text>
  <text x="150" y="78" text-anchor="middle" fill="#dcfce7" font-size="6" font-family="system-ui">specialist</text>
  <path d="M58 67 L68 67 M116 67 L126 67" stroke="#ec4899" stroke-width="2.5"/>
  <rect x="78" y="96" width="44" height="14" rx="2" fill="#ec4899"/>
  <text x="100" y="106" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">ticket →</text>
</svg>`,
  },
  command: {
    label: 'Restaurant order ticket — request queued for kitchen',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-command" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#92400e"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-command)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#fef3c7" font-size="9" font-family="system-ui" font-weight="600">Restaurant order ticket</text>
  <rect x="22" y="30" width="48" height="68" rx="3" fill="#fff" stroke="#ec4899" stroke-width="1.5"/>
  <line x1="32" y1="48" x2="60" y2="48" stroke="#6366f1" stroke-width="2"/>
  <line x1="32" y1="60" x2="58" y2="60" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="32" y1="72" x2="56" y2="72" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="46" y="88" text-anchor="middle" fill="#ec4899" font-size="7" font-family="system-ui">ticket</text>
  <path d="M78 64 L108 64" stroke="#22c55e" stroke-width="2.5"/>
  <polygon points="108,64 102,60 102,68" fill="#22c55e"/>
  <rect x="118" y="34" width="62" height="60" rx="4" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
  <text x="149" y="54" text-anchor="middle" fill="#c7d2fe" font-size="8" font-family="system-ui">kitchen</text>
  <text x="149" y="68" text-anchor="middle" fill="#a5b4fc" font-size="7" font-family="system-ui">queue</text>
  <rect x="128" y="76" width="42" height="10" rx="2" fill="#06b6d4"/>
  <text x="149" y="84" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">undo ↩</text>
</svg>`,
  },
  interpreter: {
    label: 'Calendar grammar — "every Monday 9am"',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-interpreter" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#312e81"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-interpreter)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#dcfce7" font-size="9" font-family="system-ui" font-weight="600">Calendar grammar</text>
  <rect x="28" y="28" width="144" height="64" rx="6" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
  <text x="100" y="50" text-anchor="middle" fill="#f59e0b" font-size="10" font-family="system-ui" font-weight="600">every Monday 9am</text>
  <rect x="48" y="58" width="28" height="22" rx="3" fill="#ec4899" opacity=".8"/>
  <text x="62" y="72" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">freq</text>
  <rect x="86" y="58" width="28" height="22" rx="3" fill="#06b6d4" opacity=".8"/>
  <text x="100" y="72" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">day</text>
  <rect x="124" y="58" width="28" height="22" rx="3" fill="#22c55e" opacity=".8"/>
  <text x="138" y="72" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">time</text>
  <text x="100" y="106" text-anchor="middle" fill="#bbf7d0" font-size="7" font-family="system-ui">parse → schedule event</text>
</svg>`,
  },
  iterator: {
    label: 'Music Next button — walk collection without exposing it',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-iterator" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4c1d95"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-iterator)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#fce7f3" font-size="9" font-family="system-ui" font-weight="600">Music Next button</text>
  <rect x="38" y="30" width="104" height="58" rx="6" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
  <rect x="50" y="42" width="52" height="6" rx="2" fill="#06b6d4"/>
  <rect x="50" y="54" width="36" height="6" rx="2" fill="#f59e0b" opacity=".7"/>
  <rect x="50" y="66" width="44" height="6" rx="2" fill="#22c55e" opacity=".5"/>
  <polygon points="78,52 78,72 96,62" fill="#ec4899"/>
  <text x="90" y="82" text-anchor="middle" fill="#a5b4fc" font-size="7" font-family="system-ui">now playing</text>
  <circle cx="158" cy="62" r="18" fill="#6366f1" stroke="#a5b4fc" stroke-width="2"/>
  <polygon points="152,54 152,70 168,62" fill="#fff"/>
  <text x="158" y="90" text-anchor="middle" fill="#fbcfe8" font-size="7" font-family="system-ui">Next ▶</text>
</svg>`,
  },
  mediator: {
    label: 'Air traffic tower — coordinates all planes',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-mediator" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c4a6e"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-mediator)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#ecfeff" font-size="9" font-family="system-ui" font-weight="600">Air traffic tower</text>
  <circle cx="100" cy="62" r="24" fill="#6366f1" stroke="#a5b4fc" stroke-width="2"/>
  <text x="100" y="58" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">tower</text>
  <text x="100" y="70" text-anchor="middle" fill="#c7d2fe" font-size="6" font-family="system-ui">mediator</text>
  <circle cx="32" cy="32" r="12" fill="#f59e0b"/>
  <text x="32" y="36" text-anchor="middle" fill="#78350f" font-size="6" font-family="system-ui">✈ A</text>
  <circle cx="168" cy="32" r="12" fill="#22c55e"/>
  <text x="168" y="36" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">✈ B</text>
  <circle cx="32" cy="96" r="12" fill="#ec4899"/>
  <text x="32" y="100" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">✈ C</text>
  <circle cx="168" cy="96" r="12" fill="#a855f7"/>
  <text x="168" y="100" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">✈ D</text>
  <line x1="44" y1="38" x2="78" y2="52" stroke="#fef3c7" stroke-width="1.5"/>
  <line x1="156" y1="38" x2="122" y2="52" stroke="#fef3c7" stroke-width="1.5"/>
  <line x1="44" y1="90" x2="78" y2="72" stroke="#fef3c7" stroke-width="1.5"/>
  <line x1="156" y1="90" x2="122" y2="72" stroke="#fef3c7" stroke-width="1.5"/>
</svg>`,
  },
  memento: {
    label: 'Game checkpoint — save and restore state',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-memento" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-memento)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#e0e7ff" font-size="9" font-family="system-ui" font-weight="600">Game checkpoint</text>
  <rect x="52" y="30" width="96" height="58" rx="6" fill="#0f172a" stroke="#22c55e" stroke-width="2"/>
  <text x="100" y="56" text-anchor="middle" fill="#22c55e" font-size="14" font-family="system-ui" font-weight="700">SAVE</text>
  <rect x="68" y="64" width="64" height="12" rx="2" fill="#f59e0b"/>
  <text x="100" y="73" text-anchor="middle" fill="#78350f" font-size="7" font-family="system-ui">Level 7 · 3 lives</text>
  <path d="M24 88 L52 88" stroke="#ec4899" stroke-width="2"/>
  <polygon points="18,88 24,83 24,93" fill="#ec4899"/>
  <text x="100" y="106" text-anchor="middle" fill="#a5b4fc" font-size="7" font-family="system-ui">restore snapshot later</text>
  <circle cx="168" cy="88" r="10" fill="#06b6d4"/>
  <text x="168" y="92" text-anchor="middle" fill="#fff" font-size="8" font-family="system-ui">↩</text>
</svg>`,
  },
  observer: {
    label: 'Stock price alerts — chart moves, watchers notified',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-observer" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-observer)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#dcfce7" font-size="9" font-family="system-ui" font-weight="600">Stock price alerts</text>
  <polyline points="18,88 38,72 58,78 78,48 98,58 118,38 138,52" fill="none" stroke="#6366f1" stroke-width="2.5"/>
  <circle cx="118" cy="38" r="5" fill="#f59e0b"/>
  <text x="118" y="30" text-anchor="middle" fill="#fef3c7" font-size="6" font-family="system-ui">$142</text>
  <rect x="128" y="28" width="58" height="24" rx="3" fill="#ec4899"/>
  <text x="157" y="40" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">🔔 alert!</text>
  <text x="157" y="50" text-anchor="middle" fill="#fce7f3" font-size="6" font-family="system-ui">price ↑ 5%</text>
  <rect x="128" y="58" width="58" height="24" rx="3" fill="#06b6d4"/>
  <text x="157" y="70" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">📱 push</text>
  <text x="157" y="80" text-anchor="middle" fill="#ecfeff" font-size="6" font-family="system-ui">subscriber</text>
  <path d="M118 44 L128 40 M118 46 L128 68" stroke="#fef3c7" stroke-width="1.5"/>
  <text x="68" y="106" text-anchor="middle" fill="#bbf7d0" font-size="7" font-family="system-ui">subject notifies observers</text>
</svg>`,
  },
  state: {
    label: 'Vending machine — behavior changes with mode',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-state" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#374151"/>
      <stop offset="100%" stop-color="#6b7280"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-state)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#f3f4f6" font-size="9" font-family="system-ui" font-weight="600">Vending machine</text>
  <rect x="72" y="24" width="56" height="80" rx="10" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
  <rect x="80" y="34" width="40" height="28" rx="3" fill="#0f172a" stroke="#06b6d4"/>
  <circle cx="100" cy="72" r="10" fill="#22c55e"/>
  <text x="100" y="76" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">ready</text>
  <circle cx="100" cy="90" r="8" fill="#f59e0b" opacity=".6"/>
  <text x="100" y="94" text-anchor="middle" fill="#78350f" font-size="5" font-family="system-ui">paid</text>
  <circle cx="88" cy="96" r="6" fill="#ec4899" opacity=".5"/>
  <text x="140" y="48" fill="#22c55e" font-size="7" font-family="system-ui">● idle</text>
  <text x="140" y="62" fill="#f59e0b" font-size="7" font-family="system-ui">● coin</text>
  <text x="140" y="76" fill="#ec4899" font-size="7" font-family="system-ui">● dispense</text>
  <text x="140" y="90" fill="#6366f1" font-size="7" font-family="system-ui">● sold out</text>
</svg>`,
  },
  strategy: {
    label: 'Checkout payment — pick card or UPI at runtime',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-strategy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#312e81"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-strategy)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#ecfeff" font-size="9" font-family="system-ui" font-weight="600">Checkout payment</text>
  <rect x="28" y="36" width="144" height="52" rx="6" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
  <text x="100" y="52" text-anchor="middle" fill="#a5b4fc" font-size="8" font-family="system-ui">Pay $49.99</text>
  <rect x="40" y="62" width="52" height="22" rx="4" fill="#6366f1" stroke="#a5b4fc"/>
  <text x="66" y="76" text-anchor="middle" fill="#fff" font-size="8" font-family="system-ui">💳 Card</text>
  <rect x="108" y="62" width="52" height="22" rx="4" fill="#22c55e" stroke="#bbf7d0"/>
  <text x="134" y="76" text-anchor="middle" fill="#fff" font-size="8" font-family="system-ui">UPI</text>
  <text x="100" y="106" text-anchor="middle" fill="#67e8f9" font-size="7" font-family="system-ui">swap strategy without changing checkout</text>
</svg>`,
  },
  'template-method': {
    label: 'Tea and coffee — same steps, different brew',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-template-method" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-template-method)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#fef3c7" font-size="9" font-family="system-ui" font-weight="600">Tea and coffee</text>
  <rect x="28" y="52" width="40" height="40" rx="4" fill="#92400e" stroke="#fbbf24"/>
  <text x="48" y="76" text-anchor="middle" fill="#fef3c7" font-size="8" font-family="system-ui">☕</text>
  <text x="48" y="104" text-anchor="middle" fill="#fde68a" font-size="7" font-family="system-ui">coffee</text>
  <rect x="132" y="52" width="40" height="40" rx="4" fill="#22c55e" stroke="#bbf7d0"/>
  <text x="152" y="76" text-anchor="middle" fill="#fff" font-size="8" font-family="system-ui">🍵</text>
  <text x="152" y="104" text-anchor="middle" fill="#bbf7d0" font-size="7" font-family="system-ui">tea</text>
  <rect x="82" y="36" width="36" height="14" rx="3" fill="#6366f1"/>
  <text x="100" y="46" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">1. boil</text>
  <rect x="82" y="54" width="36" height="14" rx="3" fill="#ec4899"/>
  <text x="100" y="64" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">2. brew</text>
  <rect x="82" y="72" width="36" height="14" rx="3" fill="#06b6d4"/>
  <text x="100" y="82" text-anchor="middle" fill="#fff" font-size="6" font-family="system-ui">3. pour</text>
  <text x="100" y="30" text-anchor="middle" fill="#fde68a" font-size="7" font-family="system-ui">shared template</text>
</svg>`,
  },
  visitor: {
    label: 'Tax auditor — visits each department',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true">
  <defs>
    <linearGradient id="bg-visitor" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4c1d95"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="200" height="120" fill="url(#bg-visitor)" rx="8"/>
  <text x="100" y="16" text-anchor="middle" fill="#fce7f3" font-size="9" font-family="system-ui" font-weight="600">Tax auditor</text>
  <circle cx="42" cy="62" r="22" fill="#6366f1" stroke="#a5b4fc" stroke-width="2"/>
  <text x="42" y="58" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">tax</text>
  <text x="42" y="70" text-anchor="middle" fill="#c7d2fe" font-size="6" font-family="system-ui">auditor</text>
  <rect x="88" y="28" width="44" height="30" rx="3" fill="#22c55e"/>
  <text x="110" y="48" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">HR</text>
  <rect x="88" y="68" width="44" height="30" rx="3" fill="#f59e0b"/>
  <text x="110" y="88" text-anchor="middle" fill="#78350f" font-size="7" font-family="system-ui">Sales</text>
  <rect x="148" y="48" width="44" height="30" rx="3" fill="#06b6d4"/>
  <text x="170" y="68" text-anchor="middle" fill="#fff" font-size="7" font-family="system-ui">R&amp;D</text>
  <path d="M64 50 L88 42" stroke="#fef3c7" stroke-width="1.5"/>
  <path d="M64 62 L88 62" stroke="#fef3c7" stroke-width="1.5"/>
  <path d="M64 74 L88 82" stroke="#fef3c7" stroke-width="1.5"/>
  <path d="M132 62 L148 62" stroke="#fef3c7" stroke-width="1.5"/>
  <text x="100" y="112" text-anchor="middle" fill="#fbcfe8" font-size="7" font-family="system-ui">visitor inspects each node</text>
</svg>`,
  },
};

export function getIllustration(slug: string, icon: string) {
  return patternIllustrations[slug] ?? {
    label: 'Real-life analogy',
    svg: `<svg viewBox="0 0 200 120" class="w-full h-auto" aria-hidden="true"><text x="100" y="65" text-anchor="middle" fill="#a5b4fc" font-size="32" font-family="system-ui">${icon}</text></svg>`,
  };
}
