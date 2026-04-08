# CLAUDE.md — ellocharlie.com

> Instructions for agents and humans working on the ellocharlie marketing site.
> This repo is a submodule of `ellocharlie-engine` (superrepo). Read the engine's `MEMO.md` for company voice and values before writing any copy.

---

## What This Repo Is

`ellocharlie.com` is the **public marketing landing page** for ellocharlie. It is:

- A **static HTML/CSS/JS site** — no build framework, no SSR, no CMS
- Deployed via **GitHub Pages** (from the `main` branch)
- The primary conversion surface for all acquisition channels
- Owned by the **Growth agent** (`agents/growth.yml` in the engine)

This site is the face of the company. Every word, every layout decision, and every CTA must reflect the voice in `MEMO.md`: professional, direct, customer-first, zero corporate fluff.

---

## Part of the Ellocharlie Org

This repo is a **submodule** inside `ellocharlie-engine` at `modules/site`.

- Superrepo: `https://github.com/ellocharlie/ellocharlie-engine`
- `workspace.yaml` in the engine is the single source of truth for org-wide config
- Decisions about pricing, messaging, and feature positioning must align with `workspace.yaml` KPIs and OKRs

When you need company-level context — mission, growth targets, customer profile — read `workspace.yaml` and `MEMO.md` in the engine repo.

---

## Design System

### Aesthetic

**Notion / Vercel / Linear aesthetic**: clean, high-contrast, opinionated whitespace. Content-forward. No gradients for the sake of gradients. No animation that doesn't add information. Trust is communicated through restraint.

### Typography

Fonts load from [Fontshare](https://www.fontshare.com/). Do not use Google Fonts or self-hosted alternatives.

| Role | Font | Use |
|------|------|-----|
| Display / headings | **Cabinet Grotesk** | H1, H2, hero text, large callouts |
| Body / UI | **General Sans** | Body copy, nav, labels, buttons, captions |

```html
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=general-sans@400,500,600&display=swap">
```

- Display headings: Cabinet Grotesk, weight 700–800
- Body: General Sans, weight 400–500
- UI labels / buttons: General Sans, weight 500–600
- Never mix more than these two fonts on a single page

### Color — Nexus Palette

| Name | Hex | Use |
|------|-----|-----|
| Warm Beige | `#f7f6f2` | Background (light mode) |
| Near-Black | `#28251d` | Primary text, strong UI elements |
| Teal | `#01696f` | Primary brand color, CTAs, links, highlights |

Derived values (acceptable for use):
- `#01545a` — teal hover / pressed state
- `#e8e6df` — subtle surface in light mode (cards, dividers)
- `#f0ede5` — secondary surface
- In dark mode: invert the beige/near-black relationship (see Dark Mode section)

Do not introduce colors outside this palette without explicit design approval.

---

## App Endpoints

All links to the app must use these exact URLs. Never link to a local dev URL or a staging URL in production code.

| Destination | URL |
|------------|-----|
| Login | `https://app.ellocharlie.com/login` |
| Register (default) | `https://app.ellocharlie.com/register` |
| Register — Core plan | `https://app.ellocharlie.com/register?plan=core` |
| Register — Plus plan | `https://app.ellocharlie.com/register?plan=plus` |
| Developers / API | `https://app.ellocharlie.com/developers` |

CTA buttons on the marketing site must route to the correct plan endpoint. A "Start free trial" button on the Core pricing card must link to `?plan=core`. Do not drop users on a generic register page when the plan is known from context.

---

## Dark Mode

Dark mode is toggled via the `data-theme` attribute on the `<html>` element.

```html
<!-- Light mode (default) -->
<html data-theme="light">

<!-- Dark mode -->
<html data-theme="dark">
```

Toggle logic lives in `app.js`. The preference is persisted in `localStorage` under the key `ec-theme`.

CSS variables switch on the data attribute:

```css
:root[data-theme="light"] {
  --bg: #f7f6f2;
  --fg: #28251d;
  --surface: #e8e6df;
  --accent: #01696f;
}

:root[data-theme="dark"] {
  --bg: #1a1814;
  --fg: #f0ede5;
  --surface: #28251d;
  --accent: #01a0a8;
}
```

All color references in CSS must use these variables, never hardcoded hex values. If you're adding a new component that needs a color not already covered by the variable set, add the variable to both themes before using it.

---

## Scroll Animations

Animations on scroll use the browser's `IntersectionObserver` API — no animation libraries, no GSAP, no framer-motion. The pattern:

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

Elements that should animate in add `data-animate` and start with `opacity: 0; transform: translateY(16px)`:

```css
[data-animate] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

Rules:
- Animations should be **subtle** (16px max travel, 0.3–0.5s duration)
- Never animate content that is above the fold on initial load
- Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

---

## File Structure

```
ellocharlie.com/
├── index.html          # Main landing page
├── style.css           # All styles (Nexus palette, typography, layout, dark mode vars)
├── base.css            # Reset, fonts, and CSS variable declarations
├── app.js              # Dark mode toggle, scroll animations, nav behavior
├── assets/
│   └── favicon.svg     # SVG favicon
└── CLAUDE.md           # This file
```

Keep the file structure flat. This is a static site. Do not introduce a build system, package.json, or bundler unless explicitly approved.

---

## Copy Standards

The site's copy follows the voice established in `MEMO.md`:

- **Direct.** Say what the product does in plain language. No "revolutionize," "game-changing," or "disruptive."
- **Customer-first.** Write for the founder who has 12 tabs open and is tired. What problem are we solving? Say it in the first sentence.
- **Data-backed.** Cite metrics when they exist. "15-minute first-response SLA" is more compelling than "fast support."
- **We/our** for ellocharlie. **You/your** for the reader.

Headlines use Cabinet Grotesk. Body uses General Sans. No exceptions.

### Pricing (current)

| Plan | Price | Target |
|------|-------|--------|
| Core | $45/seat/month | Startups, small ops teams |
| Plus | $65/seat/month | Growth teams needing advanced automation |

Blended ARPU: $137.50/customer (2.5 seats average). Keep pricing copy consistent with `workspace.yaml`.

---

## SEO

- Every page needs `<title>`, `<meta name="description">`, and `<link rel="canonical">`.
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`.
- The canonical URL for the homepage is `https://ellocharlie.com` (no trailing slash, no www — redirect www to apex).
- Schema.org `Organization` and `SoftwareApplication` structured data should be present in the `<head>`.

---

## What Not to Do

- Do not introduce a JavaScript framework (React, Vue, Svelte, etc.) — this site stays static.
- Do not add npm or a build step without explicit approval.
- Do not use hardcoded hex values in CSS — always use the CSS variables.
- Do not link to staging, local, or non-`app.ellocharlie.com` URLs in the production site.
- Do not use the words "revolutionary," "game-changing," or "disruptive" in any copy.
- Do not change the pricing without updating `workspace.yaml` first and verifying alignment with the CEO agent.
- Do not use Google Fonts — use Fontshare for Cabinet Grotesk and General Sans.
- Do not add analytics scripts that aren't already approved — privacy matters to the ellocharlie brand.
