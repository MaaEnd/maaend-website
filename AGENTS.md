# Repository Guidelines

## Project Structure & Module Organization
- Next.js App Router: entry in `app/page.tsx`, shared layout in `app/layout.tsx`, providers in `app/providers.tsx`.
- UI lives in `app/components` (`hero/`, `ui/` plus shared sections like `Header.tsx`, `Hero.tsx`, `InteractiveModel.tsx`).
- Styles: global tokens in `app/globals.css`; Tailwind classes sorted via Prettier plugin.
- Assets: static files in `public/`; generated build artifacts in `.next/` and `out/`.
- Localization: resource bundles in `locales/en.json` and `locales/zh.json`, wired through `i18n.ts`.

## Build, Test, and Development Commands
- `pnpm dev` — start local dev server at http://localhost:3000 with HMR.
- `pnpm build` — optimized production build; run before deploy.
- `pnpm start` — serve the built app.
- `pnpm lint` / `pnpm lint:fix` — ESLint checks (Next.js + custom rules), auto-fix when possible.
- `pnpm format` / `pnpm format:check` — Prettier with Tailwind class sorting.
- `pnpm prepare` — installs Husky hooks (runs on install if missing).

## Coding Style & Naming Conventions
- Prettier: 2-space indent, 80-char width, double quotes, semicolons, LF endings, Tailwind class sorting.
- ESLint: prefer `const`, forbid `var`, enforce `eqeqeq`, warn on unused vars (prefix `_` to ignore), enforce React hook rules and JSX keys.
- TypeScript: favor explicit types at boundaries; avoid `any` unless justified; PascalCase for components/types, camelCase for functions/vars, SCREAMING_SNAKE_CASE for env keys.

## Testing Guidelines
- Automated tests not yet established; at minimum run `pnpm lint` before pushing. Prefer adding unit tests alongside components (e.g., `app/components/__tests__/Component.test.tsx`) and e2e via Playwright when added.
- For visual changes, verify key viewports (mobile/desktop) and 3D interactions in `InteractiveModel`.

## Commit & Pull Request Guidelines
- Follow Conventional Commit prefixes seen in history (`feat:`, `fix:`, `perf:`, `chore:`); keep scope short (e.g., `feat: add hero CTA`).
- PRs: include summary of changes, link issue/PR number, attach screenshots for UI updates, and list manual checks (`pnpm lint`, local build). Keep diffs focused; split large changes into smaller PRs when possible.

## Security & Configuration Tips
- Store secrets in `.env.local`; never commit them. Mirror required keys in `.env.example` when adding new config.
- Run `pnpm build` after dependency bumps touching Next.js or Three.js to catch runtime issues early.
