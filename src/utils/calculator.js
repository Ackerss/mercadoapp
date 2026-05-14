/**
 * Calculates the unit cost for a product based on its category.
 * Base units:
 * - Papel Higiênico: R$/metro
 * - Carvão: R$/kg
 * - Cerveja/Iogurte/Others: R$/Litro (preferred) or R$/unidade
 * 
 * @param {Object} product 
 * @returns {number} The calculated unit cost. Returns Infinity if product is invalid (e.g. single ply paper).
 */
export function calculateUnitCost(product) {
    const { price, quantity = 1, unitValue, category, isDoublePly, unitType } = product;
    
    if (!price || !unitValue) return 0;

    switch (category) {
        case 'papel_higienico':
            // Only consider double or triple ply
            if (isDoublePly === false) return Infinity;
            // totalMeters = number of rolls * meters per roll
            const totalMeters = quantity * unitValue;
            return price / totalMeters;

        case 'carvao':
            // unitValue is expected to be in Kg
            return price / unitValue;

        case 'cerveja':
        case 'iogurte':
            // Handle packs and volume normalization
            let totalVolume = quantity * unitValue; // in ml or L
            if (unitType === 'ml') {
                totalVolume = totalVolume / 1000; // convert to Liters
            }
            return price / totalVolume;

        default:
            // Default to price / (quantity * unitValue)
            return price / (quantity * unitValue);
    }
}

/**
 * Standardizes a list of products with ranking info.
 * @param {Array} products 
 * @returns {Array} Sorted and decorated products.
 */
export function rankProducts(products) {
    if (!products || products.length === 0) return [];

    // First ensure unitCost is calculated for all
    const processed = products.map(p => {
        const uCost = p.unitCost || calculateUnitCost(p);
        return {
            ...p,
            unitCost: uCost,
            volumePerReal: uCost > 0 && uCost !== Infinity ? 1 / uCost : 0
        };
    });

    // Remove invalid products for sorting (Infinity) but keep them in list? 
    // Usually, we filter them out or put at bottom. Let's filter Infinity.
    const validOnes = processed.filter(p => p.unitCost !== Infinity);
    const sorted = [...validOnes].sort((a, b) => a.unitCost - b.unitCost);

    const bestOption = sorted[0];

    return sorted.map((p, index) => {
        const diffPercent = bestOption && bestOption.unitCost > 0 
            ? ((p.unitCost - bestOption.unitCost) / bestOption.unitCost) * 100 
            : 0;

        return {
            ...p,
            rank: index + 1,
            diffPercent: Math.round(diffPercent * 100) / 100, // round to 2 decimals
            isBest: index === 0
        };
    });
}
