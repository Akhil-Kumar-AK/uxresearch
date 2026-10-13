# Formative

A responsive UX research portal for managing the full design process in one case study.

## Run locally

Use Node.js 24 (or a Node version supported by Vite 7).

```sh
npm ci
npm run dev
```

The development server listens on port 5173 by default. Build deployable static files with `npm run build`; output is in `dist/`. Use `npm run preview` to serve the production build.

## Included workflows

- Case-study dashboard with live counts, search, phase/status filters, sorting, grid/list views, and illustrated covers.
- Create, edit, and delete case studies and research artifacts, with confirmation before deletion.
- Six stages: Empathize / Research, Define, Ideate, Prototype, Test & Validate, Implement & Iterate.
- Seventeen structured templates: personas, empathy maps, interviews, surveys, competitive analysis, problem statements, journey maps, affinity maps, how-might-we questions, information architecture, user flows, wireframes, prototypes, usability tests, validation findings, handoff, and iteration plans.
- Visual boards for personas, empathy maps, journey stages, user flows, and page hierarchies. Enter journey/flow steps on separate lines or separate them with arrows. Indent page hierarchy lines to represent nesting.
- Design/prototype links can be opened from artifact boards. Prototypes and wireframes are documented here; graphical design authoring remains in your design tool.
- Analytics calculated from actual workspace data. Artifact completion and case-study status are independent.
- Workspace and individual case-study JSON exports, validated imports, and optional fictional sample projects.
- Responsive layouts, keyboard-friendly dialogs, focus trapping, and locally bundled fonts.

## Data and scope

This is a client-side application. Work is stored in `localStorage` under `formative-workspace-v1`, scoped to the browser and origin. Export regularly to preserve research or transfer it to another device. Imports merge studies with new identifiers and never replace existing studies. No accounts, backend, cloud synchronization, or real-time collaboration are connected. The first visit initializes six clearly fictional sample projects. All sample data can be edited or deleted.

## Validation

```sh
npm test
npm run build
npm run test:e2e
```

Browser tests require Chromium. Install Playwright's browser using `npx playwright install chromium`, or set `CHROMIUM_PATH` to an existing browser. In the cloud development environment:

```sh
CHROMIUM_PATH=/usr/bin/chromium npm run test:e2e
```

The browser tests exercise case-study/artifact CRUD, persistence, analytics, filters, templates, import/export, visual boards, and mobile layout. Playwright starts the dev server if one is not already running.

## Project structure

- `src/data.js`: templates, initial sample data, metric calculations, and import validation.
- `src/main.js`: navigation, editors, boards, persistence, and interactions.
- `src/style.css`: responsive layout and original CSS cover illustrations.
- `tests/`: model tests and browser workflow tests.

There are no required API keys or external services. Fonts are bundled locally through npm.
