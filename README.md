<div align="center">

# ellocharlie.com

**Marketing landing page for ellocharlie — CRM built for startups.**

[![CI](https://github.com/ellocharlie/ellocharlie.com/actions/workflows/ci.yml/badge.svg)](https://github.com/ellocharlie/ellocharlie.com/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deployed on GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-blue.svg)](https://www.ellocharlie.com)
[![Part of ellocharlie-engine](https://img.shields.io/badge/superrepo-ellocharlie--engine-black.svg)](https://github.com/ellocharlie/ellocharlie-engine)

</div>

---

## What is this?

This is the public marketing landing page for [ellocharlie](https://www.ellocharlie.com) — the unified CRM, helpdesk, docs, and status platform built for growing startups. It's the primary conversion surface for all acquisition channels.

**Tech stack:** Zero-framework static HTML/CSS/JS. No build step. No SSR. No CMS. Deployed via GitHub Pages from `main`.

**Aesthetic:** Notion / Vercel / Linear — clean, high-contrast, opinionated whitespace. Content-forward. Trust is communicated through restraint.

---

## Live URL

**[https://www.ellocharlie.com](https://www.ellocharlie.com)**

| URL | Purpose |
|-----|---------|
| `https://www.ellocharlie.com` | Marketing landing page (this repo) |
| `https://app.ellocharlie.com` | Product application (Google Cloud Run) |
| `https://app.ellocharlie.com/login` | Customer login |
| `https://app.ellocharlie.com/register` | New account signup |
| `https://developers.ellocharlie.com` | Developer documentation |

---

## Design System

### Nexus Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--nexus-black` | `#0A0A0A` | Primary text, headings |
| `--nexus-white` | `#FAFAFA` | Backgrounds, inverted text |
| `--nexus-accent` | `#2563EB` | CTAs, links, highlights |
| `--nexus-muted` | `#6B7280` | Secondary text, captions |
| `--nexus-border` | `#E5E7EB` | Dividers, card borders |
| `--nexus-surface` | `#F9FAFB` | Card backgrounds, code blocks |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Headings | Cabinet Grotesk | 700–800 |
| Body | General Sans | 400–500 |
| Code / mono | JetBrains Mono | 400 |

Both fonts are loaded via CDN — no self-hosted assets required.

### Layout Principles

- Max content width: `1200px`
- Column grid: 12-column with `24px` gutters
- Section padding: `120px` vertical on desktop, `64px` on mobile
- No gradients for decoration. No animation that doesn't add information.

---

## Local Development

No build step required. Any static file server works.

### Option 1 — Python (built-in)

```bash
git clone https://github.com/ellocharlie/ellocharlie.com.git
cd ellocharlie.com
python -m http.server 8080
# Open http://localhost:8080
```

### Option 2 — Open directly

```bash
open index.html
```

### Option 3 — Bun

```bash
bunx serve .
```

### File structure

```
ellocharlie.com/
├── index.html          # Main landing page
├── style.css           # Global styles + design tokens
├── base.css            # CSS reset and base rules
├── app.js              # Minimal JS (nav, animations, form handling)
├── assets/
│   └── favicon.svg
├── AGENTS.md           # Agent operating instructions
├── CLAUDE.md           # Claude Code agent instructions
├── CONTRIBUTING.md     # Contribution guide
├── CHANGELOG.md        # Release history
└── LICENSE             # MIT
```

---

## Deployment

Deployed automatically to GitHub Pages on every push to `main` via the CI workflow at `.github/workflows/ci.yml`.

No manual deploy step. Merge a PR → site is live in ~60 seconds.

### Environment

| Setting | Value |
|---------|-------|
| Deploy target | GitHub Pages |
| Branch | `main` |
| Root | `/` |
| Custom domain | `www.ellocharlie.com` |

---

## Content Guidelines

All copy must align with the company voice defined in [`MEMO.md`](https://github.com/ellocharlie/ellocharlie-engine/blob/main/MEMO.md) in the engine repo:

- Professional, direct, customer-first
- Zero corporate fluff
- No buzzwords ("synergy", "leverage", "disrupt")
- Empathy before features — lead with the problem, not the product

Pricing, messaging, and feature positioning must align with `workspace.yaml` KPIs and OKRs in [`ellocharlie-engine`](https://github.com/ellocharlie/ellocharlie-engine).

---

## Part of the ellocharlie Org

This repo is a submodule inside [`ellocharlie-engine`](https://github.com/ellocharlie/ellocharlie-engine) at `modules/site`. The engine repo is the superrepo and single source of truth for the org.

| Repo | Description |
|------|-------------|
| [ellocharlie/ellocharlie-engine](https://github.com/ellocharlie/ellocharlie-engine) | Superrepo — brain, dashboard, orchestrator |
| [ellocharlie/ellocharlie-agents](https://github.com/ellocharlie/ellocharlie-agents) | Agent runtimes and skills platform |
| [ellocharlie/ellocharlie-content](https://github.com/ellocharlie/ellocharlie-content) | Blog and content pipeline |

---

<div align="center">

Built by the [ellocharlie](https://github.com/ellocharlie) team · MIT License

</div>
