import React, { useState } from 'react';
import { X, Check, Info } from 'lucide-react';

export default function ProductForm({ onSubmit, onCancel, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    price: initialData.price || '',
    category: initialData.category || 'cerveja',
    quantity: initialData.quantity || 1,
    unitValue: initialData.unitValue || '',
    unitType: initialData.unitType || 'ml',
    isDoublePly: initialData.isDoublePly ?? true,
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      unitValue: parseFloat(formData.unitValue)
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom duration-300">
      <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-bold text-gray-700">Validar Produto</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
        {/* Basic Info */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nome do Produto</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Cerveja Gelada"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Preço Total (R$)</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Categoria</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="cerveja">Cerveja / Bebida</option>
              <option value="papel_higienico">Papel Higiênico</option>
              <option value="carvao">Carvão</option>
              <option value="iogurte">Iogurte</option>
              <option value="outros">Outros</option>
            </select>
          </div>
        </div>

        {/* Dynamic Fields based on category */}
        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1">
            <Info size={14} /> Detalhes da Medição
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-widest leading-none">
                {formData.category === 'papel_higienico' ? 'Qtde de Rolos' : 'Qtde no Pack'}
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-widest leading-none">
                {formData.category === 'papel_higienico' ? 'Metros por Rolo' : (formData.category === 'carvao' ? 'Kg Totais' : 'Volume Unitário')}
              </label>
              <div className="flex gap-1">
                <input
                  type="number"
                  step="0.01"
                  name="unitValue"
                  value={formData.unitValue}
                  onChange={handleChange}
                  className="w-full bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm"
                  required
                />
                {(formData.category === 'cerveja' || formData.category === 'iogurte' || formData.category === 'outros') && (
                  <select
                    name="unitType"
                    value={formData.unitType}
                    onChange={handleChange}
                    className="bg-white border border-emerald-200 rounded-lg px-1 py-2 text-xs"
                  >
                    <option value="ml">ml</option>
                    <option value="L">L</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="un">un</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {formData.category === 'papel_higienico' && (
            <label className="flex items-center gap-2 cursor-pointer mt-1">
              <input
                type="checkbox"
                name="isDoublePly"
                checked={formData.isDoublePly}
                onChange={handleChange}
                className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
              />
              <span className="text-xs font-medium text-emerald-800">Folha Dupla ou Tripla</span>
            </label>
          )}
        </div>

        <button 
          type="submit"
          className="w-full bg-emerald-600 text-white font-bold rounded-xl py-4 shadow-md flex items-center justify-center gap-2 hover:bg-emerald-700 active:scale-95 transition-all mt-2"
        >
          <Check size={20} />
          Confirmar e Salvar
        </button>
      </form>
    </div>
  );
}
