import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, X } from 'lucide-react';

export default function CameraCapture({ onCapture, disabled }) {
  const fileInputRef = useRef(null);

  const handleCapture = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(onCapture);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleCapture}
        accept="image/*"
        capture="environment"
        multiple
        className="hidden"
      />
      
      <div className="flex gap-4">
        <button
          onClick={() => fileInputRef.current.click()}
          disabled={disabled}
          className={`flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed transition-all ${
            disabled ? 'border-gray-100 bg-gray-50' : 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-600'
          }`}
        >
          <Camera size={48} className="mb-2" />
          <span className="text-sm font-bold uppercase tracking-wider">Tirar Foto</span>
        </button>

        <button
          onClick={() => {
              fileInputRef.current.removeAttribute('capture');
              fileInputRef.current.click();
              fileInputRef.current.setAttribute('capture', 'environment');
          }}
          disabled={disabled}
          className={`flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed transition-all ${
            disabled ? 'border-gray-100 bg-gray-50' : 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-600'
          }`}
        >
          <ImageIcon size={48} className="mb-2" />
          <span className="text-sm font-bold uppercase tracking-wider">Galeria</span>
        </button>
      </div>
      
      <p className="text-[10px] text-gray-400 font-medium text-center px-8">
        DICA: Tire fotos da embalagem, do preço e dos detalhes (letras pequenas) para melhor precisão.
      </p>
    </div>
  );
}
