import React, { useState, useEffect } from 'react'
import { Camera, Plus, Settings, Sparkles, Loader2, X } from 'lucide-react'
import { useProductStore } from './store/useProductStore'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import CameraCapture from './components/CameraCapture'
import { extractDataFromImages } from './utils/visionApi'

function App() {
  const { products, addProduct, removeProduct, clearProducts } = useProductStore();
  const [view, setView] = useState('list'); // 'list', 'capture', 'form'
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('mercado_app_api_key') || '');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem('mercado_app_api_key', apiKey);
  }, [apiKey]);

  const handleStartCapture = () => {
    setView('capture');
  };

  const handleCapture = async (images) => {
    setLoading(true);
    setView('list'); // move to background loading
    try {
      const extracted = await extractDataFromImages(images, apiKey);
      setEditingData(extracted);
      setView('form');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (data) => {
    addProduct(data);
    setView('list');
    setEditingData(null);
  };

  const handleManualAdd = () => {
    setEditingData({
        name: '', price: '', category: 'cerveja', quantity: 1, unitValue: '', unitType: 'ml', isDoublePly: true
    });
    setView('form');
  };

  return (
    <div className="min-h-screen pb-32 max-w-md mx-auto bg-gray-50 shadow-sm border-x border-gray-200 flex flex-col relative">
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl relative">
            <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 text-gray-400"><X size={20} /></button>
            <h3 className="font-black text-gray-800 text-lg mb-4">Configurações</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Gemini API Key</label>
                <input 
                  type="password" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Seu código secreto..."
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <p className="text-[9px] text-gray-400 mt-1 italic">
                  *Vazio usará o modo Simulação (Mock).
                </p>
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="w-full bg-emerald-600 text-white font-bold rounded-xl py-3 shadow-md"
              >
                Salvar e Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-emerald-600 text-white p-4 shadow-md sticky top-0 z-20 flex justify-between items-center h-16 shrink-0">
        <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
          Mercado<span className="text-emerald-200">App</span>
        </h1>
        <button 
          onClick={() => setShowSettings(true)}
          className="p-2 hover:bg-emerald-700 rounded-full transition-colors"
        >
          <Settings size={20} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="p-4 flex-1 overflow-y-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-emerald-600">
            <Loader2 size={48} className="animate-spin" />
            <p className="font-bold text-sm animate-pulse">Inteligência Artificial analisando...</p>
          </div>
        )}

        {!loading && (
          <>
            {view === 'list' && (
              <ProductList 
                products={products} 
                onRemove={removeProduct} 
                onClear={clearProducts}
              />
            )}
            
            {view === 'capture' && (
              <div className="mt-8 flex flex-col gap-6">
                 <h2 className="text-center font-bold text-gray-700">Como você prefere adicionar?</h2>
                 <CameraCapture onCapture={handleCapture} disabled={loading} />
                 <button 
                  onClick={() => setView('list')}
                  className="text-gray-400 text-xs font-semibold hover:underline"
                 >
                   Cancelar
                 </button>
              </div>
            )}

            {view === 'form' && (
              <ProductForm 
                onSubmit={handleFormSubmit} 
                onCancel={() => setView('list')}
                initialData={editingData}
              />
            )}
          </>
        )}
      </main>

      {/* Navigation / Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 max-w-md mx-auto bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pointer-events-none">
        {view === 'list' && !loading && (
          <div className="flex gap-3 pointer-events-auto">
            <button 
              onClick={handleStartCapture}
              className="flex-1 bg-emerald-600 active:bg-emerald-700 transition-all text-white font-bold rounded-2xl py-4 shadow-xl flex items-center justify-center gap-2 text-lg active:scale-95 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity"></div>
              <Camera size={24} />
              <span>Analisar Foto</span>
              <Sparkles size={16} className="text-emerald-200" />
            </button>
            <button 
               onClick={handleManualAdd}
               className="bg-white border-2 border-emerald-600 text-emerald-600 p-4 rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center"
            >
              <Plus size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
