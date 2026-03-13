# Robust Vision API Fix Plan

**Goal:** Fix the 400/404 errors by using the most stable subset of the Gemini API.

---

## Proposed Changes

### [Vision API Utility] (src/utils/visionApi.js)

- [ ] **Step 1: Revert to v1beta Endpoint**
The 404 in `v1beta` was likely due to a model name inconsistency. I will use the canonical `v1beta` endpoint.

- [ ] **Step 2: Simplify generationConfig**
Remove `responseMimeType` which is causing the 400 "Unknown field" error on some account tiers/versions. Gemini 1.5 is already excellent at following JSON instructions in the prompt.

- [ ] **Step 3: Update Prompt for JSON Enforcement**
Explicitly ask for JSON and specify "No markdown".

- [ ] **Step 4: Update JSON Parser**
Ensure the code can handle cases where the model might still return markdown backticks (` ```json ... ``` `).

---

## Verification Plan

### Manual Verification
1. Push the update.
2. User to test with their key.
3. This approach is "param-safe" meaning it uses the minimal required fields to avoid schema errors.
