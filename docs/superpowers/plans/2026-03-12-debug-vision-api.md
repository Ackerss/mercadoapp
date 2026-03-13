# Debug Vision API Integration Plan

**Goal:** Identify why the Gemini API call is failing with a real API key and fix it to ensure 100% functionality.

---

## Phase 1: Diagnostic Improvements (Systematic Debugging)

**Files:**
- Modify: `src/utils/visionApi.js`

- [ ] **Step 1: Enhance Error Logging**
Update `extractDataFromImages` to log the full response body if the fetch is not OK. This will reveal if the API key is invalid, if there's a quota issue, or a safety block.

- [ ] **Step 2: Dynamic MIME Type Handling**
Extract the mime type from the data URL instead of hardcoding `image/jpeg`.

- [ ] **Step 3: Add Request Visualization**
Log the prompt being sent to ensure it's not being mangled.

---

## Phase 2: Implementation & Fixes (Hypothesis Testing)

- [ ] **Step 1: Apply Fixes based on Logs**
If the logs show a specific error (e.g., "model not found"), update the model name. If it's a safety block, adjust the system prompt to be more neutral.

- [ ] **Step 2: Fallback for JSON Mode**
If Gemini fails to respect the JSON mode, add a secondary parsing logic to strip markdown code blocks.

---

## Verification Plan

### Automated Tests
- None, as this requires a live API key. 

### Manual Verification
1. Push the diagnostic version.
2. User to try again.
3. I will use the `browser_subagent` to read the console logs (using `capture_browser_console_logs`) from the user's live deployment if possible, or ask the user to provide the logs.
**Correction:** I can't read the user's local console easily without them sending a screenshot or text. I will ask the user to click "Inspect" and check the console.
