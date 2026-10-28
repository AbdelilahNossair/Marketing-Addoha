# Addoha Green Homes — Interactive Marketing Presentation

A React/Vite academic marketing presentation about a Moroccan housing campaign. The website organizes strategy, segments, marketing levers, conversion-funnel ideas, rollout phases, and comparisons as interactive sections.

## What runs

`src/main.jsx` imports **`addoha-green-homes.jsx`** as the active application. The repository also contains `welli-moul-dar-v3.jsx`, an alternative presentation source that is not the current entry point.

The site uses local React state for tabs, expanded rows, segments, and comparison panels. Campaign figures and proposals are presentation content, not a live analytics feed or evidence of deployed commercial results.

## Stack and local setup

The manifest specifies React 18.3, Vite 6, and the React Vite plugin. Use a Node.js/npm environment compatible with Vite 6.

```bash
git clone https://github.com/AbdelilahNossair/Marketing-Addoha.git
cd Marketing-Addoha
npm install
npm run dev
```

Open the Vite URL printed in the terminal, normally `http://localhost:5173`. No backend, database, API account, or environment variable is required by the reviewed application entry point.

## Presentation interaction

- Use navigation buttons to scroll to sections.
- Switch audience segments and marketing-mix panels.
- Expand funnel steps and conversion-target details.
- Open implementation phases and comparison rows.
- Scroll to trigger reveal animations.

The main component uses IntersectionObserver and scroll listeners. If animations do not trigger, inspect browser support and the developer console.

## Build and preview

```bash
npm run build
npm run preview
```

Vite writes the production bundle to `dist/`. Test the preview at mobile and desktop widths before deployment.

## Repository map

| Path | Purpose |
| --- | --- |
| `src/main.jsx` | React mounting and active presentation selection |
| `addoha-green-homes.jsx` | Main presentation, styles, interactive content |
| `welli-moul-dar-v3.jsx` | Alternate presentation implementation |
| `index.html` | Browser entry document |
| `vite.config.js` | Vite configuration |
| `academic-report.md` | Supporting written report |
| `presentation-script.md` | Speaker/script material |
| `slides-content.md` | Slide-oriented content |

## Customization

For copy and scenario changes, edit the arrays and section content in the active JSX file. Brand colors are defined near its beginning. Keep section identifiers aligned with the navigation array so scrolling still works.

To display the alternate version, deliberately change the import in `src/main.jsx` and verify its exports/dependencies. Merely editing the alternative file does not change the current site.

## Verification and limitations

Check every interactive panel, navigation target, accordion, and small-screen layout. The package declares development/build/preview scripts, but no lint or automated test script.

The application does not collect leads, process registrations, connect to a CRM, or validate campaign forecasts. Distinguish proposed targets, assumptions, and observed results when reusing the academic material. Large sections currently live in a single component; extracting reusable components would improve maintainability.

Add source dates and citations for market claims when preparing an external presentation. Brand references do not establish an official affiliation. No standalone license file is included.
