# Supermarket Cost-Benefit App Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a mobile-first PWA that uses Vision API to extract product data (price, quantity) and strict JS math to calculate and compare cost-benefit ratios.

**Architecture:** React + Vite + TailwindCSS static web app. LocalStorage for saving product sessions. Pure JS mathematical engine for cost per unit calculations.

**Tech Stack:** React, Vite, Tailwind CSS, Lucide React (icons), Vitest (for math logic).

---

## Chunk 1: Project Setup and UI Skeleton

### Task 1: Initialize Vite Project and Tailwind
**Files:**
- Create: `package.json`, `index.html`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
- Create: `src/App.jsx`, `src/index.css`, `src/main.jsx`

- [ ] **Step 1: Set up project files and dependencies**
Run: `npm init -y`
Run: `npm install react react-dom lucide-react`
Run: `npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer vitest`
Initialize tailwind and configure `content` array in `tailwind.config.js`. Add basic Tailwind directives to `index.css`.

- [ ] **Step 2: Create the App shell**
Create `src/App.jsx` with a mobile-first layout (max-width container, header, main content area, bottom fixed action button).

- [ ] **Step 3: Verify build**
Run: `npx vite build`
Expected: Passes without errors.

- [ ] **Step 4: Commit**
`git init`, add files, `git commit -m "chore: setup react vite tailwind project"`

---

## Chunk 2: The Core Math Engine (100% Precision)

### Task 2: Implement Calculation Logic
**Files:**
- Create: `src/utils/calculator.js`
- Create: `src/utils/calculator.test.js`

- [ ] **Step 1: Write the failing tests**
Create tests for `calculateUnitCost(product)` covering scenarios: paper towels (ignoring single ply if checkbox checked), charcoal (price per kg), and beer/yogurt (price per L or ml, including packs).
Create tests for `rankProducts(products)` to ensure the array sorts correctly by unit cost and calculates percentage difference from the best option.

- [ ] **Step 2: Run tests to verify they fail**
Run: `npx vitest run src/utils/calculator.test.js`
Expected: FAIL due to missing functions.

- [ ] **Step 3: Write minimal implementation**
Implement `calculateUnitCost` and `rankProducts` in `src/utils/calculator.js`.
The engine must handle parsing strings like "1.5L" or "350ml x 12" into standardized base units (e.g., liters).

- [ ] **Step 4: Run test to verify passes**
Run: `npx vitest run src/utils/calculator.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**
`git add`, `git commit -m "feat: core mathematical engine and tests"`

---

## Chunk 3: State Management & UI Components

### Task 3: Product Store & Flow Components
**Files:**
- Create: `src/store/useProductStore.js` (simple custom hook wrapper around LocalStorage and React context/state)
- Create: `src/components/ProductList.jsx`
- Create: `src/components/ProductForm.jsx`

- [ ] **Step 1: Implement Product Store**
Write a custom hook to manage an array of products, sync it to `localStorage`, and provide `addProduct`, `updateProduct`, `removeProduct`, and `clearProducts` methods.

- [ ] **Step 2: Implement ProductList**
Build the comparison UI showing the ranked list. The best item gets a green `#1` badge. Others show `+X%` in red if they are more expensive.

- [ ] **Step 3: Implement ProductForm (Validation)**
Build the form (Name, Total Price, Quantity/Volume, Category, Pack Size). This form is manually editable but will eventually be pre-filled by the Vision API.

- [ ] **Step 4: Integrate into App.jsx**
Connect the store to the UI components. Add a "New Product" view toggle.

- [ ] **Step 5: Commit**
`git add`, `git commit -m "feat: state management and primary ui"`

---

## Chunk 4: Camera and Vision API Integration

### Task 4: Image Capture & OCR Mock
**Files:**
- Create: `src/components/CameraCapture.jsx`
- Create: `src/utils/visionApi.js`

- [ ] **Step 1: Implement Camera Image Capture**
Use HTML `<input type="file" accept="image/*" capture="environment" multiple>` to allow mobile users to take photos easily. Convert images to base64.

- [ ] **Step 2: Implement Vision API Call**
Write `extractDataFromImages(base64Images, apiKey)` in `visionApi.js`. 
If `apiKey` is empty, write a mock function that simulates a 2-second delay and returns fake extracted data (for testing purposes without spending tokens). The prompt to the actual API should explicitly tell the LLM: *Only extract identifying info and numbers. Do NOT calculate the unit price.*

- [ ] **Step 3: Connect Capture to Form**
When pictures are taken, trigger the API. Show a loading state. When data returns, pre-fill the `ProductForm` and switch to the validation view.

- [ ] **Step 4: Add Settings Modal for API Key**
Allow the user to input their Gemini/OpenAI API key and save it to `localStorage` so they control their own OCR costs.

- [ ] **Step 5: Commit**
`git add`, `git commit -m "feat: image capture and vision api integration"`
