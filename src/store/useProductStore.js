import { useState, useEffect } from 'react';
import { rankProducts, calculateUnitCost } from '../utils/calculator';

const STORAGE_KEY = 'mercado_app_products';

export function useProductStore() {
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }, [products]);

    const addProduct = (productData) => {
        const id = Date.now();
        const unitCost = calculateUnitCost(productData);
        const newProduct = { ...productData, id, unitCost };
        setProducts(prev => [...prev, newProduct]);
        return newProduct;
    };

    const updateProduct = (id, updates) => {
        setProducts(prev => prev.map(p => {
            if (p.id === id) {
                const updated = { ...p, ...updates };
                return { ...updated, unitCost: calculateUnitCost(updated) };
            }
            return p;
        }));
    };

    const removeProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const clearProducts = () => {
        setProducts([]);
    };

    const rankedProducts = rankProducts(products);

    return {
        products: rankedProducts,
        addProduct,
        updateProduct,
        removeProduct,
        clearProducts
    };
}
