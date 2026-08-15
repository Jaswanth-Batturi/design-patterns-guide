# Design Patterns, Simply

Learn when to use each of the 23 Gang of Four patterns — everyday scenes, without/with tradeoffs, runnable Java, and quizzes.

**Live site:** [jaswanth-batturi.github.io/design-patterns-guide](https://jaswanth-batturi.github.io/design-patterns-guide/)

**Repo:** [github.com/Jaswanth-Batturi/design-patterns-guide](https://github.com/Jaswanth-Batturi/design-patterns-guide)

## What you get on every pattern page

1. **Picture this in real life** — 3-step everyday scene
2. **Without vs with** — concrete pains and wins
3. **When to use / skip** — decision checklist
4. **Code comparison** — starts on *without pattern* so you see the problem first
5. **Runnable Java demo** — short `main()` in embedded OneCompiler editor
6. **Quiz** — 2 questions with explanations

Plus a **pattern finder** on the home page and **library search** across all 23 patterns.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321/design-patterns-guide](http://localhost:4321/design-patterns-guide)

## Quality checks

```bash
npm run test:site      # build + static verification
npm run test:e2e       # Playwright (needs preview on :4321)
npm run test:e2e:live  # against GitHub Pages
npm run test:deep      # deeper content + UX audit
```

## Deploy

Push to `main` — GitHub Actions deploys to GitHub Pages at `/design-patterns-guide/`.

## Tech stack

- [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com)
- [Shiki](https://shiki.style/) syntax highlighting
- [OneCompiler](https://onecompiler.com/) embed for Java execution

## Author

[Jaswanth Batturi](https://github.com/Jaswanth-Batturi)

## License

MIT
