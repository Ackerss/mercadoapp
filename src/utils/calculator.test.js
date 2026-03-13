import { describe, it, expect } from 'vitest';
import { calculateUnitCost, rankProducts } from './calculator';

describe('Calculator Logic', () => {
    describe('calculateUnitCost', () => {
        it('calculates paper towel cost correctly (base unit: meters)', () => {
            const product = {
                category: 'papel_higienico',
                price: 20.0,
                quantity: 12, // rolls
                unitValue: 30, // meters per roll
                isDoublePly: true
            };
            // Total meters = 12 * 30 = 360m
            // Unit cost = 20 / 360 = 0.0555...
            expect(calculateUnitCost(product)).toBeCloseTo(0.0556, 4);
        });

        it('discards single ply paper towels', () => {
             const product = {
                category: 'papel_higienico',
                price: 10.0,
                quantity: 4,
                unitValue: 30,
                isDoublePly: false
            };
            expect(calculateUnitCost(product)).toBe(Infinity);
        });

        it('calculates charcoal cost correctly (base unit: kg)', () => {
            const product = {
                category: 'carvao',
                price: 25.0,
                unitValue: 5, // kg
            };
            expect(calculateUnitCost(product)).toBe(5.0);
        });

        it('calculates beer/yogurt cost correctly (base unit: Liters)', () => {
            const product = {
                category: 'cerveja',
                price: 36.0,
                quantity: 12, // pack of 12
                unitValue: 350, // 350ml
                unitType: 'ml'
            };
            // Total volume = 12 * 350 = 4200ml = 4.2L
            // Unit cost = 36 / 4.2 = 8.5714...
            expect(calculateUnitCost(product)).toBeCloseTo(8.5714, 4);
        });
    });

    describe('rankProducts', () => {
        it('ranks products from cheapest to most expensive', () => {
            const products = [
                { id: 1, name: 'Brand A', unitCost: 0.5 },
                { id: 2, name: 'Brand B', unitCost: 0.4 },
                { id: 3, name: 'Brand C', unitCost: 0.6 }
            ];
            const ranked = rankProducts(products);
            expect(ranked[0].id).toBe(2); // Brand B is cheapest
            expect(ranked[1].id).toBe(1);
            expect(ranked[2].id).toBe(3);
        });

        it('calculates percentage difference from best option', () => {
            const products = [
                { id: 1, name: 'Best', unitCost: 10 },
                { id: 2, name: 'Expensive', unitCost: 15 }
            ];
            const ranked = rankProducts(products);
            expect(ranked[0].diffPercent).toBe(0);
            expect(ranked[1].diffPercent).toBe(50); // 15 is 50% more than 10
        });

        it('calculates Volume por R$1', () => {
            const product = { unitCost: 0.5 }; // R$0.50 per meter
            // 1 / 0.5 = 2 meters per R$1
            const ranked = rankProducts([product]);
            expect(ranked[0].volumePerReal).toBe(2);
        });
    });
});
