# AI Agent Instructions

react-router-scroll-to-top is a React component and hook that scroll to the top of the page when the React Router location changes. [README.md](./README.md) is for the package's users, [CONTRIBUTING.md](./CONTRIBUTING.md) holds the contributor workflow and conventions, and this file holds what only agents need.

Before making non-trivial changes, read `CONTRIBUTING.md` and the files near the area you are editing.

## AI Priorities

- Prefer repository conventions and nearby examples over generic patterns.
- Treat `.agents/skills/*` and `.claude/skills/*` as generic guidance. If a skill example conflicts with repository conventions, existing dependencies, or nearby patterns, adapt it instead of copying it literally.
- Keep `README.md` user-facing, `CONTRIBUTING.md` contributor-facing, and this file AI-facing. Do not copy large chunks between them.
- If the documents drift out of sync, treat `CONTRIBUTING.md` as the source of truth for contributor workflow and coding conventions. Then update the other docs to match.
- The package's exports, peer dependency ranges, and published files are its public contract. Unless the task asks for an API change, keep them as they are. A change to them updates `README.md` and `docs/index.md`, and its commit type follows `CONTRIBUTING.md` → "Versioning and Publishing".

## Repository-specific Implementation Rules

- The package exports `ScrollToTop` and `useScrollToTop` from `src/index.ts`. `ScrollToTop` only runs the hook and renders its children.
- Import React Router from `react-router`, never from `react-router-dom`. The peer ranges are React 18 or 19 and React Router 7 or 8, so use only APIs that every version in those ranges has.
- Every change of the location's pathname or state scrolls the window to the top, except a navigation whose `location.state.scrollToTop` is `false`. `README.md` and `docs/index.md` document that state key, so keep its name and meaning.
- The package serves React Router's declarative mode. A data router or framework mode uses React Router's `<ScrollRestoration>`, as `README.md` says, so the package adds nothing for them.
- jsdom doesn't implement scrolling, so `vitest.setup.ts` stubs `window.scrollTo`. Tests spy on it with `vi.spyOn(window, 'scrollTo')`.

## AI Coding Expectations

- Don't hard-wrap prose. Prettier's `proseWrap: 'never'` joins wrapped lines in the files it formats, but it skips gitignored files.
- Follow [CONTRIBUTING.md](./CONTRIBUTING.md) → "TRACK Comments". During coding, when an in-scope change must retain a workaround because of a verified external blocker, add or update a `TRACK:` comment. Include an actionable exit condition. If a direct upstream link is available, include it too. Do not use `TRACK` for locally actionable work. Leave `.agents/skills/review-track-comments/track-comments.md` unchanged during ordinary implementation so the next `review-track-comments` audit can detect the change.

## Quality Gates (Always Apply Without Being Asked)

After every non-trivial change, proactively run and fix the following — do not wait for the user to request it:

1. **Tests** — run the affected tests with `pnpm test`.
   - Add or update tests for any new or changed logic. Coverage must stay at 100%, so when source under `src/` changes, run `pnpm test:coverage`.
2. **TypeScript** — run `pnpm typecheck` and resolve all type errors before considering the task done.
3. **ESLint** and **Prettier** — run `pnpm lint` and `pnpm format`. Fix all lint errors and warnings that the change introduced. When Markdown files change, also run `pnpm lint:markdown` and fix every finding.
4. **Spelling** — run `pnpm lint:spelling` (cspell, en-US) and resolve findings. Fix real typos, and add legitimate terms to `cspell.json`.
   - Removing stale words follows the `review-spelling-words` skill.
5. **Build** — when the change touches `src/`, `package.json`, or the build configuration, run `pnpm build`. It builds the package and checks it with publint and arethetypeswrong.
6. **Dependencies** — when a change adds, removes, or re-versions a dependency, run `pnpm audit`, `pnpm audit signatures`, and `pnpm dedupe --check`, as the `dependency-audit` CI job does.
   - Toolchain and batch updates follow the `update-dependencies` skill.

Never hand work back to the user while any of the above are failing or unapplied.

## Avoid Generic Suggestions

- Don't suggest restoring the scroll position on back and forward navigation: `<ScrollRestoration>` does that in a data router, and this package only scrolls to the top.
- Don't suggest support for React Router 5 or 6, or for `react-router-dom` as a peer: version 1 of the package serves them.

## Agent Scripts

These rules cover every script under `.agents/`. Beyond them, a script follows `CONTRIBUTING.md` → "TypeScript" and "Testing" like the rest of the code.

- Write a script in TypeScript, as `<name>.ts`, that runs with `node`. `.agents/tsconfig.json` checks the scripts as Node runs them, so a local import names the `.ts` file. `pnpm typecheck`, `pnpm lint`, and `pnpm test` cover them.
- When the work is mostly running other commands and moving files, such as a launcher, write a shell script. Once a script parses structured data such as JSON or YAML, keeps state beyond a flat list, calls an HTTP API, or holds logic worth a unit test, write it in TypeScript. When shell would need a tool that a stock macOS or Linux system lacks, such as `jq`, write it in TypeScript too. A launcher that ends by handing its process to the program it starts (`exec`) stays shell, even when it first probes a local HTTP endpoint.
- Start a shell script with `#!/usr/bin/env bash` and `set -euo pipefail`. Use only bash 3.2 features, since macOS ships that version: no associative arrays, `mapfile`, or `${var,,}`. Use only the options that the BSD and GNU versions of a tool share: no `sed -i`, `grep -P`, `date -d` or `-v`, `stat -c` or `-f`, `readlink -f`, `find -printf`, or `xargs -r`. A program the script exists to drive, such as `git` or `gh`, is fine.
- Unless TypeScript and shell both carry a real cost, such as a library that exists only in Python, do not use Python. An extension that a tool loads in its own language, such as a pandoc Lua filter, stays in that language.
- Test a script the way you test application code. Write unit tests for its own logic, such as parsing, decisions, and data transforms, and none for code that only calls other programs. A test uses fakes, never the network or a real account.
- After changing a shell script, check it with `pnpm dlx shellcheck@4 <changed shell scripts>`.

## AI Tooling

### Canonical files

Some agent tools expect configuration at tool-specific paths. Keep one canonical file per concern and use the established symlinks instead of maintaining mirrored copies independently.

- **Skills:** `.agents/skills/` is canonical. `.claude/skills` symlinks to it.

### Skills

Create and edit skills only in the canonical tree, `.agents/skills/`, so tool-specific paths cannot drift.

Installed local skills are:

- `review-spelling-words`
- `review-track-comments`
- `update-dependencies`

Always read the relevant `SKILL.md` before acting on a task the skill covers. Do not reference a skill without reading its file first.

Skill guidance is generic. Unless nearby code already uses the skill's example approach or the task explicitly calls for a wider refactor, preserve established patterns and existing dependencies.
