# Patterns in Practice

An interactive guide to software design patterns — real-life analogies, Java examples, quizzes, and a pattern finder.

**Live site:** [jaswanth-batturi.github.io/design-patterns-guide](https://jaswanth-batturi.github.io/design-patterns-guide/)

**Repo:** [github.com/Jaswanth-Batturi/design-patterns-guide](https://github.com/Jaswanth-Batturi/design-patterns-guide)

## Features

- **All 23 GoF patterns** — full creational, structural, and behavioral catalog
- **Real-life analogies** before diving into code
- **Syntax-highlighted Java** (Shiki) with before/after toggle
- **JDoodle runner** — load interactive Java console per pattern
- **Animated analogy cards** with real-life explanations
- **Open Graph image** for social sharing
- **Quick quizzes** per pattern
- **Pattern Finder** — describe your problem, get suggestions
- **100% free hosting** on GitHub Pages

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321/design-patterns-guide](http://localhost:4321/design-patterns-guide)

### Deploy to GitHub Pages

1. Push to `main` on this repo
2. Go to **Settings → Pages → Build and deployment → Source: GitHub Actions**
3. The workflow deploys automatically on each push to `main`

Site URL: `https://jaswanth-batturi.github.io/design-patterns-guide/`

## Build

```bash
npm run build
npm run preview
```

## Tech stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS](https://tailwindcss.com) — styling
- GitHub Pages + GitHub Actions — free hosting

## Contributing

Contributions welcome! Add patterns, improve analogies, or fix quizzes.

1. Fork the repo
2. Create a branch (`git checkout -b add-adapter-pattern`)
3. Add pattern data in `src/data/patterns.ts`
4. Open a pull request

## Author

[Jaswanth Batturi](https://github.com/Jaswanth-Batturi)

## License

MIT
