## Global Agent Preferences (`~/.codex/AGENTS.md`)

**Purpose:** Define personal development preferences so the AI agent aligns with the developer’s environment and style.

### Editor & IDE Setup

- **VS Code Settings:** Use Visual Studio Code with workspace settings that auto-format on save. Ensure the Prettier and ESLint extensions are enabled for consistent style.
- **Indentation:** 2 spaces (default for Prettier). No tabs.
- **Line Length:** 80 characters recommended (Prettier default) to improve readability.
- **Trim Trailing Whitespace:** Enabled – the editor should remove extra spaces on save to keep diffs clean.

### Shell & Tooling

- **Yarn as Package Manager:** Always use `yarn` instead of npm for consistency. Run `yarn install` (or `yarn`) after cloning to install dependencies.
- **Node Version:** Use the project’s Node.js LTS (e.g. Node 18+). If using nvm, run `nvm use` if a `.nvmrc` is provided (otherwise ensure a compatible version).
- **Aliases:** Common shell aliases for efficiency, for example:
  - `alias ydev="yarn dev"` – quick start the development server.
  - `alias ylint="yarn lint --fix"` – run linter with auto-fix.
  - `alias yfmt="yarn prettier --write ."` – format the entire project.

### Personal Code Style Preferences

- **Code Style:** Rely on Prettier + ESLint for style enforcement. Preferences like quotes or semicolons use project defaults (Prettier default: **double quotes**, **semi-colons on**, trailing commas where valid). The agent should not deviate from these defaults.
- **ES6+ Syntax:** Prefer modern JavaScript/TypeScript conventions (arrow functions, `const/let` instead of `var`, template literals, etc.). No old-style ES5 function syntax unless necessary.
- **React/Next.js:** Use functional React components with Hooks. Avoid class components. Write **JSX** that is clean and readable (proper indentation, self-closing tags when empty, etc.).

### Git & Workflow

- **Commits:** Write descriptive commit messages (e.g. _“Add Hero component and intro section”_ rather than _“update”_). Use present tense and aim for the Conventional Commits style if possible (e.g. `feat: `, `fix: ` prefixes) for clarity.
- **Branches:** For new work, create feature branches (e.g. `feature/contact-form`) rather than committing directly to main. This keeps main stable and allows PR reviews. Delete merged branches to keep the repo tidy.
- **Pull Requests:** Even though personal, treat PRs professionally. Include clear description, screenshots for UI changes, and link any relevant issues. Use the project’s PR template (see project AGENTS.md) as a guide for content.

By establishing these personal preferences, the AI agent will adhere to the same development environment setup and style choices as the maintainer, ensuring consistency from the get-go.
