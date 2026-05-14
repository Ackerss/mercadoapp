/**
 * Utility to interact with Vision APIs (Gemini).
 */

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
export const DEFAULT_MODEL = "gemini-2.5-flash-lite";

export const AVAILABLE_MODELS = [
    { id: "gemini-2.5-flash-lite", label: "Gemini 2.5 Flash-Lite", hint: "Recomendado, mais barato (padrão)" },
    { id: "gemini-2.5-flash",      label: "Gemini 2.5 Flash",      hint: "Mais robusto, ~2x o custo" },
    { id: "gemini-3.1-flash-lite", label: "Gemini 3.1 Flash-Lite", hint: "Mais novo e rápido, ~3x o custo" },
];

const SYSTEM_PROMPT = `
You are a scanner for a supermarket comparison app. 
Analyze the provided images (usually a product photo, a price tag, and/or product details).
Extract the following information as a JSON object:
{
  "name": "Full product name/brand",
  "price": number (the total price),
  "category": "cerveja" | "papel_higienico" | "carvao" | "iogurte" | "outros",
  "quantity": number (e.g., number of rolls or units in a pack),
  "unitValue": number (single unit volume/weight or meters per roll),
  "unitType": "ml" | "L" | "m" | "g" | "kg" | "un"
}

RULES:
1. If there's a promotion (e.g., "Leve 3 Pague 2" or "Preço Clube"), use the FINAL price for the quantity specified.
2. For multiple items (packs), extract the number of units and the volume of ONE unit.
3. NEVER calculate the unit cost yourself. Just extract the raw numbers as shown.
4. If a value is missing or illegible, set it to 0 or null.
`;

export async function extractDataFromImages(base64Images, apiKey, model = DEFAULT_MODEL) {
    if (!apiKey) throw new Error("Chave de API não configurada. Acesse as Configurações para inserir sua chave.");

    try {
        const parts = base64Images.map(img => ({
            inlineData: {
                data: img.split(',')[1], // remove prefix
                mimeType: "image/jpeg"
            }
        }));

        const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: SYSTEM_PROMPT },
                        ...parts
                    ]
                }],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            })
        });

        const result = await response.json();
        const textResponse = result.candidates[0].content.parts[0].text;
        return JSON.parse(textResponse);
    } catch (error) {
        console.error("Vision API Error:", error);
        throw new Error("Falha ao analisar imagem. Verifique sua chave de API.");
    }
}
