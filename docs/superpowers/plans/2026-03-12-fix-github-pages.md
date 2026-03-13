# Fix GitHub Pages Deployment Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the 404/blank page issue on GitHub Pages by configuring Vite's base path and adding an automated deployment workflow.

**Architecture:** Update `vite.config.js` for sub-path awareness and add a `.github` workflow for GitHub Actions.

---

## Task 1: Configure Vite and Actions

**Files:**
- Modify: `vite.config.js`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Update vite.config.js**
Set `base: '/mercadoapp/'` in the config to match the GitHub Pages URL structure.

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/mercadoapp/',
})
```

- [ ] **Step 2: Create Deployment Workflow**
Create a workflow that builds the app and deploys to GitHub Pages using the official actions.

- [ ] **Step 3: Commit and Push**
`git add .`, `git commit -m "fix: set base path and add deployment workflow"`, `git push origin main`

---

## Verification Plan

### Automated Tests
- None applicable for the workflow itself, but `npm run build` should still pass locally.

### Manual Verification
1. Push to GitHub.
2. Go to the "Actions" tab in the GitHub repository.
3. Wait for the "pages-build-deployment" workflow to finish.
4. Visit `https://ackerss.github.io/mercadoapp/` to verify the app loads.
