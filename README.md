# Patterns in Practice

An interactive guide to software design patterns — real-life analogies, Java examples, quizzes, and a pattern finder.

**Repo:** [github.com/jaswanth-batturi_navi/design-patterns-guide](https://github.com/jaswanth-batturi_navi/design-patterns-guide)

### Free hosting options

| Platform | Cost | Notes |
|----------|------|-------|
| [Cloudflare Pages](https://pages.cloudflare.com) | Free | Connect GitHub repo, build `npm run build`, output `dist` |
| [GitHub Pages](https://pages.github.com) | Free | Works on personal public repos (`Jaswanth-Batturi` account) |
| Local | Free | `npm run dev` |

## Features

- **5 patterns** (Observer, Strategy, Factory, Singleton, Decorator) — more coming
- **Real-life analogies** before diving into code
- **Before/after Java** with copy button
- **Quick quizzes** per pattern
- **Pattern Finder** — describe your problem, get suggestions
- **100% free hosting** on GitHub Pages

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321/design-patterns-guide](http://localhost:4321/design-patterns-guide)

### Deploy to Cloudflare Pages (recommended, free)

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create**
2. Connect your GitHub repo
3. Build settings: **Framework preset** = Astro, or manual:
   - Build command: `npm run build`
   - Build output: `dist`
4. Deploy — you get a free `*.pages.dev` URL

Update `site` and `base` in `astro.config.mjs` if your URL differs from GitHub Pages defaults.

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
