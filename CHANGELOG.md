# Changelog — ellocharlie.com

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.1.0] - 2026-04-08

### Added

- **`index.html`** — Full marketing landing page. Includes hero, problem statement, product features, pricing section (Core: $45/seat/mo, Plus: $65/seat/mo), and CTA buttons linking to `https://app.ellocharlie.com/register?plan=core` and `https://app.ellocharlie.com/register?plan=plus`.
- **`style.css`** — All layout, component, and theme styles using the Nexus palette CSS variables. Dark mode implemented via `[data-theme="dark"]` selector. Scroll animation states (`[data-animate]`, `.is-visible`). Responsive breakpoints for mobile, tablet, and desktop.
- **`base.css`** — CSS reset, font declarations (Cabinet Grotesk via Fontshare for headings, General Sans for body/UI), and CSS custom property declarations for both light and dark themes.
- **`app.js`** — Dark mode toggle (persisted to `localStorage` under `ec-theme`), `IntersectionObserver`-based scroll animations (no animation libraries), and navigation scroll-behavior. Respects `prefers-reduced-motion`.
- **`assets/favicon.svg`** — SVG favicon in brand teal (`#01696f`).
- **`CLAUDE.md`** — Agent and human instructions: site architecture, Nexus design system (colors, typography, dark mode variables), app endpoint reference, copy standards, SEO requirements, and what-not-to-do rules.

### Design System

Nexus palette established:

| Token | Value | Use |
|-------|-------|-----|
| Warm Beige | `#f7f6f2` | Light mode background |
| Near-Black | `#28251d` | Primary text |
| Teal | `#01696f` | Brand color, CTAs, links |

Typography: Cabinet Grotesk (display/headings, weight 700–800) and General Sans (body/UI, weight 400–600). Both loaded from Fontshare.

### Deployment

- Deployed via GitHub Pages from the `main` branch
- Canonical URL: `https://ellocharlie.com` (apex, no www, no trailing slash)
- No build step — pure static HTML/CSS/JS

---

[Unreleased]: https://github.com/ellocharlie/ellocharlie.com/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/ellocharlie/ellocharlie.com/releases/tag/v0.1.0
