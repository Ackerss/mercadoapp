/**
 * Utility to interact with Vision APIs (Gemini 1.5 Flash).
 * For now, it includes a robust mock mode to allow development without an API key.
 */

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

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

export async function extractDataFromImages(base64Images, apiKey) {
    if (!apiKey) {
        console.warn("No API Key provided. Returning mock data.");
        return simulateOcr(base64Images);
    }

    try {
        const parts = base64Images.map(img => ({
            inlineData: {
                data: img.split(',')[1], // remove prefix
                mimeType: "image/jpeg"
            }
        }));

        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
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

async function simulateOcr(images) {
    // Artificial delay
    await new Promise(r => setTimeout(r, 2000));
    
    // Return mock data based on "probability" for testing
    return {
        name: "Produto Identificado por IA (Mock)",
        price: 19.90,
        category: "cerveja",
        quantity: 12,
        unitValue: 350,
        unitType: "ml"
    };
}
