## Project Guidelines (Repository Root `AGENTS.md`)

**Purpose:** Communicate project-wide standards and workflows for the **Portfolio**. This helps any contributor or AI agent understand how to properly test, lint, build, and contribute to the project.

### Tests

- **Adding Tests:** We plan to add a testing framework in the future. If you contribute tests, place them alongside components as `[component].test.js`. Ensure `yarn test` can run them.

### Lint & Format

- **ESLint:** The project uses **ESLint** with Next.js recommendations. The configuration extends Next.js’s default rules (including Core Web Vitals) and integrates Prettier for formatting. Run `**yarn lint**` to catch issues. Linting must pass before committing (CI will fail otherwise).
  - The ESLint config is defined in `.eslintrc.json`. It extends `"next/core-web-vitals"` (ensuring no unused vars, proper `<>` key usage, etc.).
  - **Auto-fix:** Many issues can be auto-fixed. Use `yarn lint --fix` to let ESLint correct what it can (mostly formatting issues handled by Prettier).

- **Prettier:** Code formatting is enforced via Prettier (2-space indent, consistent quotes, etc.). We strive to keep the code style uniform:
  - **Formatting on Save:** With the recommended IDE setup, files format on save. Otherwise, run `**yarn format**` (if defined) or `yarn prettier --write .` to format all files.
  - **No stylistic debates:** We adhere to lint and Prettier rules strictly, so avoid manual style tweaks that conflict with these tools. If you think a rule should change (rare), discuss in an issue/PR.

### Build / Deploy

- **Development Server:** Use `**yarn dev**` to run Next.js in development mode. This starts a local server at [localhost:3000](http://localhost:3000). The app supports hot-reloading, so changes to components/pages reflect immediately.
- **Production Build:** Use `**yarn build**` to create an optimized production build (generates the `.next` directory). You can then run `**yarn start**` to serve the production build locally for testing. Ensure the site builds without errors before pushing.
- **Static Export:** For deployment on GitHub Pages, we use Next’s static export.
- **Deployment Process:** The project is deployed via **GitHub Pages**. We have GitHub Actions set up to automate this:
  - On every push to `main`, the CI workflow installs dependencies and runs `yarn build && yarn export`.
  - The static content in `out/` is then deployed to the `gh-pages` branch (which GitHub Pages serves) or uploaded via the Pages Action. **Do not** commit the `out` folder to main. The deployment is handled by CI.
  - **Custom Domain:** The presence of the `CNAME` file indicates a custom domain for the portfolio. **Gotcha:** If you fork this repo, remove or update the CNAME, otherwise Pages will still attempt to use our domain.

- **Verification:** After your changes are merged and the deploy workflow runs, verify the live site to ensure nothing broke. (GitHub Pages may take a minute to update.)

### Conventions

- **Project Structure:** This is a Next.js app. All page components reside an `src/app` directory. Reusable UI pieces live in `src/components`. Static assets like images are in `public/`.
- **Naming:** Use descriptive names for files and components:
  - React components should be **PascalCase** (e.g. `HeroSection.tsx` exporting `HeroSection` component). Files in `app/` can be lowercase (e.g. `about/page.tsx` becomes route `/about`).
  - CSS modules (if used) should mirror the component name (e.g. `HeroSection.module.scss`).

- **Styling:** We use SCSS for styling, along with any component libraries as needed. Keep styles scoped to the component when possible. Global styles can be added in `src/app/global.scss`.
  - If using React-Bootstrap, follow its usage guidelines and prefer its components over raw HTML for consistency.

- **Data & Content:** Hard-coded content (like portfolio items or text) might be stored in JSON or constants. Update those sources rather than scattering strings throughout components. For example, project data might live in a `data/` folder – update that source of truth so all components reflect changes.
- **Commits & PRs:** Follow a consistent git workflow (see **Git & Workflow** in global prefs). Small, focused commits are better than one large commit. Open a PR for any change; even minor fixes get reviewed for knowledge sharing.

### PR Template

When opening a Pull Request, follow the repository’s PR guidelines. (The `.github/PULL_REQUEST_TEMPLATE.md` is used to pre-fill new PR descriptions.) Ensure your PR body includes:

- **Description:** A concise summary of _what_ your change does and _why_. Example: “Add a new `ProjectsGrid` component to showcase recent work on the homepage.” Mention any relevant issue numbers (e.g., “Closes #12 if applicable”).
- **Type of Change:** Indicate if it’s a feature, bugfix, refactor, chore, etc. (e.g., add a bold **Feature** or **Fix** label in the description).
- **How to Test:** Describe how reviewers can verify your changes. For UI changes, “Run `yarn dev` and navigate to `/projects` to see the new grid. Ensure it is responsive.” If you added a script or API, include steps or commands to test it.
- **Screenshots:** If the PR includes UI changes or fixes, add before/after screenshots or GIFs. This helps reviewers quickly understand visual impacts.
- **Checklist:** Confirm that you have completed common checks. For example:
  - [ ] The code **builds and runs** without errors (`yarn build` passes).
  - [ ] ESLint and Prettier are **passing** (`yarn lint` shows no errors).
  - [ ] **Relevant documentation is updated**, including README or comments, if needed.
  - [ ] No sensitive info is exposed (secrets, API keys, etc., should be in `.env`).

By filling out these sections, you make it easier for maintainers (and the AI agent) to review and merge your contribution. PRs that follow the template and guidelines will be reviewed more quickly.

### Environment

- **Environment Variables:** The app may require certain environment variables for full functionality. For example, analytics or contact form features might need API keys. Any required variables should be documented (e.g. in a `.env.example` file or README).
  - If the project uses a Google Analytics ID, set `NEXT_PUBLIC_GA_ID` in a `.env` file. (Prefix with `NEXT_PUBLIC_` for variables that need to be exposed to the frontend, per Next.js conventions.)
  - **Local Development:** Create a `.env` file in the project root (this file is git-ignored) and add keys as needed. Restart `yarn dev` after adding env variables. The provided `.env` file in the repo is blank or for reference – you must supply actual values.

- **GitHub Pages Env:** Note that GitHub Pages serves a static build. There is no runtime environment for server-side secrets. Any necessary secret (like an email service API) cannot run on the server via Pages. Use client-side APIs or third-party services for forms/etc.
- **Node Environment:** Next.js builds will use `NODE_ENV=production` when running `yarn build`. Avoid code that behaves differently in dev vs prod without good reason. If you need to check environment, use `process.env.NODE_ENV`.

### Gotchas

- **Next.js Routing on Pages:** When deployed on GitHub Pages, direct navigation to a non-root URL (like `/about`) may lead to 404s (since GH Pages doesn’t support client-side routing by default). **Solution:** Our static export includes an `404.html` that acts as a catch-all. Always use Next’s `<Link>` for internal links (to leverage client-side navigation and avoid full page reloads). If you encounter a 404 on refresh, that’s a known GH Pages limitation with client-side routing.
- **Asset Paths:** Because we use a custom domain (see CNAME), we don’t set a `basePath` in `next.config.js`. All asset paths are root-relative. If deploying under a subpath (e.g. `username.github.io/repo`), update `next.config.js` with `basePath` and `assetPrefix` accordingly.
- **ESLint/Prettier Conflicts:** We use `eslint-config-prettier` to turn off ESLint rules that conflict with Prettier formatting. In case the agent sees ESLint errors about formatting, run the formatter or fix accordingly rather than manually adjusting.
- **Large Media:** The repository avoids large media files since it’s hosted on Pages. If you add images, optimize them. If adding video or large assets, consider embedding or using a CDN.
- **State Management:** This app likely uses React’s built-in state and context for simplicity (no Redux or MobX). Before introducing a new state management library, consider if it’s truly needed for this scale. Discuss in an issue first.
- **Hot Reload vs Build Issues:** Sometimes a change might work in `yarn dev` but not in the static export (for example, using `getServerSideProps` which isn’t supported in `next export`). Be mindful to use **Static Generation** (`getStaticProps`) or **client-side data fetching** for features so the static build is successful. If a page truly needs server-side rendering, we cannot use it on GH Pages – refactor such logic.

These project guidelines ensure consistency and prevent common mistakes. The AI agent (and any human contributor) should follow them to maintain code quality and project stability.
