# Supermarket Cost-Benefit Analysis App - Design Document

## 1. Overview
A mobile-first Web Application (PWA) designed to replace a ChatGPT assistant for calculating and comparing the cost-benefit of supermarket products based on photos. The application enforces mathematical accuracy by decoupling the optical character recognition (OCR) from the calculations.

## 2. Core Problem Solved
LLMs often hallucinate or fail at exact mathematics when trying to analyze cost-benefit ratios from images. This application uses an LLM (Vision API) *only* for data extraction, while strict code handles the mathematical comparisons and rankings.

## 3. Architecture & Tech Stack
*   **Frontend User Interface:** React, TailwindCSS, Vite (Static Site). Hosted via GitHub Pages.
*   **Data Extraction (OCR/Vision):** Google Gemini 1.5 Flash API (or OpenAI Vision) integrated directly in the frontend.
*   **Math Engine:** Pure JavaScript functions specific to product categories.
*   **Storage:** LocalStorage (browser memory) to persist the active session's comparisons.

## 4. User Flow
1.  **Capture Stage:** User opens the app and uses the camera to take one or multiple photos of a product (e.g., general packaging + price tag + fine print).
2.  **Extraction Stage:** The Vision API identifies: Name/Brand, Total Price, and Total Quantity/Volume/Weight.
3.  **Validation Stage:** A form presents the extracted data. The user can manually correct any errors made by the Vision API before proceeding, ensuring 100% data fidelity.
4.  **Analysis Stage:** The Javascript Math Engine calculates the standardized unit cost (e.g., R$/metro, R$/litro).
5.  **Comparison Stage:** Products are displayed in a sorted list. The best option is highlighted in green. It calculates the % difference from the best option and shows the "Volume/Weight per R$1".
6.  **Auto-finalization:** Adding a new product without explicit deletion adds to the current running comparison list.

## 5. Category Rules
*   **Papel Higiênico:** Ignorar folha simples (via checkbox na validação). Extrair total de metros (quantidade de rolos * metros por rolo). Cálculo: Custo por metro.
*   **Sacos de Carvão:** Extrair Kg totais. Cálculo: Custo por Kg. Diferenciar tipos se legível (Premium vs Comum).
*   **Iogurte:** Cálculo: Custo por L ou ml uniforme.
*   **Cervejas e Chopps:** Considerar embalagens múltiplas (packs). Extrair total em Litros/ml. Cálculo: Custo por Litro.

## 6. Next Steps
*   Create implementation plan for the PWA structure.
*   Implement camera API and Vision API integration.
*   Build the Validation UI and Math Engine logic.
