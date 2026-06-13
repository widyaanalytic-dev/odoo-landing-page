# Pink Photon

Interactive landing page for **Widya Analytic** — Odoo implementation partner. Built as a scroll-driven slide deck with bilingual copy (ID/EN), animated visuals, and ERP demo scenarios.

## Tech stack

- [Astro](https://astro.build) 6 — HTML shell and hydration
- [React](https://react.dev) 19 — interactive slide deck
- [Tailwind CSS](https://tailwindcss.com) 4 — styling
- [Motion](https://motion.dev) — animations
- [Lenis](https://lenis.darkroom.engineering) — smooth scroll
- TypeScript (strict) + Vitest + ESLint + Prettier

## Project structure

```
src/
├── pages/index.astro          # Single route entry
├── layouts/LandingLayout.astro
├── data/
│   ├── slides.config.ts       # Slide order, nav, metadata
│   └── landing/               # i18n copy (split by section)
├── components/interactive/
│   ├── App.tsx                # Root providers + deck
│   ├── slides/                # 15 slide components
│   ├── visuals/               # Interactive demos per slide
│   └── ui/                    # Shared layout primitives
├── hooks/                     # Demo + visibility hooks
└── lib/                       # cn, motion, assert, scroll helpers
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm test` | Run Vitest suite |
| `npm run test:e2e` | Run Playwright E2E tests (requires Node >= 22; CI builds then runs preview) |
| `npm run lint` | ESLint |
| `npm run check` | Astro type check |
| `npm run format` | Prettier write |

Requires **Node.js >= 22.12.0** (`.nvmrc` pins major version 22).

### E2E setup (first time)

```bash
nvm use          # switch to Node 22
npm run test:e2e:install   # download Chromium for your machine (arm64/x64)
npm run test:e2e
```

If you see `Executable doesn't exist at .../ms-playwright/...`, run `npm run test:e2e:install` again after switching to Node 22.

## Adding a new slide

1. **Register the slide** in [`src/data/slides.config.ts`](src/data/slides.config.ts):
   - Add a new `SlideId` union member
   - Add an entry to `slideMetaList` (id, label, variant, backdrop)

2. **Add copy** in [`src/data/landing/sections/`](src/data/landing/sections/) with `id` and `en` locales, then export from [`src/data/landing/content.ts`](src/data/landing/content.ts).

3. **Create the slide component** in `src/components/interactive/slides/`:
   - Use `SlideComponentProps` from `slides.config.ts`
   - Prefer `ProofSlide` for standard proof-layout slides
   - Pass `sectionLabel={meta.label}` to `SlideLayout`

4. **Create a visual** (if needed) in `src/components/interactive/visuals/`:
   - Accept `{ slideIndex: number }`
   - Gate animations with `useSlideInView(onEnter, onLeave, { slideIndex })`

5. **Wire the registry** in [`src/components/interactive/slides/index.ts`](src/components/interactive/slides/index.ts).

6. **Add nav** (optional) in `navSections` inside `slides.config.ts`.

7. **Run tests**: `npm test` — registry and smoke tests will catch missing wiring.

## i18n workflow

- Copy lives under `src/data/landing/sections/*.ts` with `{ id: {...}, en: {...} }` shape
- Use `useLang()` + `t(landingContent.section, locale)` in components
- Locale persists in `localStorage` key `widya-locale`
- `LangProvider` syncs `<html lang>` on mount and toggle

## Architecture

```
index.astro → App.tsx
  LangProvider + ScrollProvider
    HeaderNav (scroll-to-slide nav)
    Slides.tsx → slideMetaList × slideComponents
      *Slide.tsx → SlideLayout → *Visual.tsx
```

Navigation is scroll-based (no client router). Keyboard: ArrowUp/Down, PageUp/Down.
