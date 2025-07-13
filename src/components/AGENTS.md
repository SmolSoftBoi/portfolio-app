## Feature-Specific Agent Guide (Optional example: `src/components/AGENTS.md`)

**Purpose:** An example of a folder-specific guide. If a particular subdirectory has unique conventions or complexity (like a set of components or an API integration), an `AGENTS.md` in that folder can provide targeted instructions. Here we demonstrate what one might contain for the `src/components` directory.

### Components Overview

* The `src/components/` folder contains reusable presentational and functional components used across pages. Each component should be **modular and focused** on a single UI piece (e.g. `Navbar`, `ProjectCard`, `Footer`).
* **File Structure:** Prefer one component per file. If a component is complex, you can create a subfolder:

  ```
  src/components/FeatureCard/
    ├─ FeatureCard.tsx   (React component)
    ├─ FeatureCard.module.scss  (CSS module for styling, if applicable)
    └─ index.tsx         (optional, re-export for cleaner imports)
  ```

  This isn’t strictly required for simple components, but it can help organize related files (styles, tests).

### Conventions

* **Naming:** Component files and component names use PascalCase (e.g. `ContactForm.js` contains `ContactForm`).
* **Props and Types:** Keep prop usage clear and well-defined. If we were using TypeScript or PropTypes:

  * In TypeScript, define an interface for props at the top of the file and use it in the function signature.
  * In TS, consider using JSDoc comments or PropTypes to document expected prop types.
* **Styling:** Components should either:

  * Rely on global styles (defined in `globals.scss`) **or**
  * Have a corresponding CSS module for scoped styles (preferred for new components to avoid side effects). Import the module as `styles` and use className like `className={styles.container}`.
  * If **React-Bootstrap** is used, prefer its components/styles over custom ones for consistent design. For example, use `<Button>` from the library rather than a custom `<button>` if styling matches.
* **State & Hooks:** Favor React Hooks for internal component state and effects. For instance, use `useState` for form inputs, `useEffect` for fetching on mount (if a component does fetch – though data fetching is usually in pages or via SWR). Avoid using legacy lifecycle methods or class state (we use functional components exclusively).
* **Accessibility:** Ensure components are accessible:

  * Use proper semantic HTML tags (e.g. `<button>` for clickable actions, with accompanying `aria-label` if the text isn’t descriptive).
  * All images must have alt text.
  * Forms should have label elements tied to inputs.
    The agent should prioritize accessibility in any suggested code.

### Gotchas in Components

* **No Direct DOM Manipulation:** Avoid using `document.getElementById` or manual DOM mutations in components. Instead, use React refs or state. For example, rather than manually focusing an element with vanilla JS on mount, use `useRef` and React’s ref callback or `useEffect` to manage focus. This keeps the React tree in control and works with SSR.
* **Server-Side Considerations:** Remember that during the static export, components run in a Node.js context for rendering. Avoid accessing browser-specific APIs (like `window` or `document`) at the top level. If needed, wrap such code in a check:

  ```ts
  if (typeof window !== "undefined") {
    // browser-only logic
  }
  ```

  This prevents errors during build/export.
* **Performance:** For expensive operations (e.g. image processing, heavy calculations), consider using `useMemo` or moving logic outside the render if possible. This app is small, but it’s good practice as the project grows (e.g., a component listing many projects should paginate or lazy-load images).
* **Import Paths:** Use relative imports within the `src` directory (no need for lengthy `../../../` – update the `tsconfig.json` or Next.js config if absolute imports are set up for `src`). Consistent import style prevents confusion. For example, `import ProjectCard from "@/components/ProjectCard";` if `@` is configured to `src/`, otherwise `import ProjectCard from "../components/ProjectCard";` from a page.

### Collaboration

* If adding a new component in this folder:

  * **Write a brief comment** at the top of the component file describing what it does, especially if non-obvious. This helps future contributors (and AI) understand its purpose.
  * **Update relevant pages** to use the new component, and ensure styling matches the overall site theme. For instance, if you create a `Testimonial` component, integrate it into the page and check it in light/dark modes if applicable.
  * **Consider reusability:** Could this component be useful elsewhere on the site? If so, design it to be flexible (props for content/styling). If it’s very specific to one page, still put it here (not in pages folder) if it might be reused later, but note its specific usage in a comment.

*(If this project had other feature-specific folders, similar AGENTS.md files would outline their guidelines. Use this section as a template for creating those as needed.)*
