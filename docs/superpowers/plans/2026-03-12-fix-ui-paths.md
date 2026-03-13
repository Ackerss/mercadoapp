# Fix Broken UI on GitHub Pages Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the broken styling and layout on the live site by ensuring HTML uses relative paths that Vite can transform correctly for the `/mercadoapp/` subpath.

**Architecture:** Update `index.html` to use relative paths. Verify the `dist/` output locally to ensure assets are correctly linked.

---

## Phase 1: Fix HTML Paths

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update index.html paths**
Change `/favicon.svg` to `./favicon.svg` and `/src/main.jsx` to `./src/main.jsx`.

- [ ] **Step 2: Run build locally**
Run: `npm run build`
Check `dist/index.html` to see if the assets now have paths like `href="/mercadoapp/assets/..."` or similar.

---

## Phase 2: Verificação de Segurança (Skill: systematic-debugging)

- [ ] **Step 1: Push and Verify Actions**
Push to main and wait for the deployment.

- [ ] **Step 2: Manual Check**
Visit `https://ackerss.github.io/mercadoapp/` and check the browser console if it still fails.

---
## Verification Plan

### Automated Build Check
- Run `npm run build` and inspect `dist/index.html`.
- Ensure script tags and link tags match the expected base path structure.

### Manual Verification
- User to reload the page and confirm UI appears premium (emerald green header, centered layout).
