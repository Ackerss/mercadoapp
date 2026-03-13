import React from 'react';
import { Trash2, Trophy, ArrowRight } from 'lucide-react';

export default function ProductList({ products, onRemove, onClear }) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-400">
        <p className="text-sm font-medium">Bip Bop! 🤖</p>
        <p className="text-xs mt-1">Sua lista está vazia. Comece analisando um produto!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="font-bold text-gray-700 flex items-center gap-2">
          Comparação ({products.length})
        </h2>
        <button 
          onClick={onClear}
          className="text-xs text-red-500 font-semibold hover:underline"
        >
          Limpar Tudo
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <div 
            key={p.id} 
            className={`relative overflow-hidden bg-white border rounded-2xl p-4 shadow-sm transition-all ${
              p.isBest ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-gray-200'
            }`}
          >
            {p.isBest && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl flex items-center gap-1">
                <Trophy size={10} /> Melhor Opção
              </div>
            )}
            
            <div className="flex justify-between items-start mb-2">
              <div className="max-w-[75%]">
                <h3 className="font-bold text-gray-800 leading-tight truncate">{p.name || 'Produto sem nome'}</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {p.quantity > 1 ? `${p.quantity}x ` : ''}{p.unitValue}{p.unitType || (p.category === 'papel_higienico' ? 'm' : 'kg')}
                </p>
              </div>
              <button 
                onClick={() => onRemove(p.id)}
                className="text-gray-300 hover:text-red-400 p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex items-end justify-between mt-4">
              <div>
                <span className="text-2xl font-black text-emerald-600">
                  R${p.price.toFixed(2)}
                </span>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Preço Total</p>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-1 mb-0.5">
                   {!p.isBest && (
                     <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-50 text-red-500">
                       +{p.diffPercent}%
                     </span>
                   )}
                   <span className="text-sm font-bold text-gray-700">
                    R${p.unitCost.toFixed(3)}
                   </span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  por {p.category === 'papel_higienico' ? 'metro' : (p.category === 'carvao' ? 'kg' : 'Litro')}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
               <div className="text-[11px] text-gray-500">
                  <span className="font-bold text-emerald-600">{p.volumePerReal.toFixed(2)}</span>
                  {p.category === 'papel_higienico' ? 'm' : (p.category === 'carvao' ? 'kg' : 'L')} por R$1
               </div>
               {p.isBest && (
                 <div className="text-[10px] text-emerald-600 font-medium">
                   Economia garantida!
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
