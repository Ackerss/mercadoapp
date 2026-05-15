# ⚠️ ATENÇÃO IA — LEIA ANTES DE MEXER NESTE PROJETO

## Este projeto faz parte de um ecossistema de 3 apps

O **MercadoApp (preço baixo)** é um dos dois projetos que alimentam um terceiro app chamado **Mercado Acker Unificado**.

```
C:\Users\User\Meu Drive\ANTIGRAVITY\
│
├── Mercado Facil ACKER\          ← Projeto irmão
│   └── (lista colaborativa, Firebase, tempo real)
│
├── mercado_preçobaixo_app\       ← VOCÊ ESTÁ AQUI
│   └── (comparador de preços, Gemini OCR)
│
└── mercado-acker_unificado\      ← App que junta os dois
    └── (copia o código desta pasta via npm run sync)
```

---

## O QUE VOCÊ PODE FAZER AQUI

✅ **Edite livremente** — refatore, corrija bugs, adicione features.  
✅ As mudanças feitas aqui **não quebram o app unificado** automaticamente.  
✅ O app unificado só se atualiza quando o Jacson rodar `npm run sync` lá.

---

## O QUE VOCÊ NÃO DEVE FAZER

❌ **Não mova nem renomeie esta pasta.**  
O app unificado (`../mercado-acker_unificado/`) depende do caminho exato:  
`C:\Users\User\Meu Drive\ANTIGRAVITY\mercado_preçobaixo_app\`

Se precisar mover, avise o Jacson e atualize `SOURCES.comparar` em:  
`../mercado-acker_unificado/scripts/sync-features.mjs`

---

## SOBRE ESTE PROJETO

**O que faz:** Comparador de preços no supermercado.  
O usuário tira foto da etiqueta, a IA (Google Gemini) extrai os dados via OCR,  
e o app calcula e ranqueia qual produto é mais barato por unidade (litro, kg, metro, etc).

**Regra fundamental:** A IA só faz OCR. Todo cálculo matemático é feito em JS puro (`src/utils/calculator.js`).

**Stack:** React 19 + Vite 8 + TailwindCSS v4 + Gemini API + LocalStorage

**Deploy:** [ackerss.github.io/mercadoapp](https://ackerss.github.io/mercadoapp/)  
**Repositório:** [github.com/Ackerss/mercadoapp](https://github.com/Ackerss/mercadoapp)  
**Deploy automático:** push em `main` → GitHub Actions → GitHub Pages em ~2 min

---

## ESTRUTURA IMPORTANTE

```
src/
  App.jsx                  → shell, gerencia views ('list' | 'capture' | 'form')
  components/
    CameraCapture.jsx      → captura de foto(s)
    ProductForm.jsx        → formulário validação/edição
    ProductList.jsx        → lista comparativa com ranking
  store/
    useProductStore.js     → addProduct, updateProduct, removeProduct, clearProducts
  utils/
    calculator.js          → calculateUnitCost(product), rankProducts(products)
    visionApi.js           → extractDataFromImages, AVAILABLE_MODELS, DEFAULT_MODEL
```

---

## TAILWINDCSS v4 — AVISOS CRÍTICOS

### Sintaxe CORRETA (v4) em `src/index.css`:
```css
@import "tailwindcss";
```

### Sintaxe ERRADA (v3 — quebra o app):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Vite config — `base: '/mercadoapp/'` é OBRIGATÓRIO:
```js
// vite.config.js — NÃO REMOVA o base!
export default defineConfig({
  plugins: [react()],
  base: '/mercadoapp/',   // ← obrigatório pra GitHub Pages
})
```

**Atenção:** O app unificado (`../mercado-acker_unificado/`) NÃO usa `base`. Isso é específico deste projeto pra GitHub Pages.

---

## COMO PROPAGAR MUDANÇAS PRO APP UNIFICADO

Depois de fazer push aqui:

```bash
# Vá na pasta do app unificado e rode:
cd "../mercado-acker_unificado"
npm run sync:comparar
npm run dev       # testa
git add . && git commit -m "sync: atualiza aba comparar" && git push
```

---

*Documentação gerada em 2026-05-14 pelo Mercado Acker Unificado.*  
*Para contexto completo, veja: `../mercado-acker_unificado/LEIA_PRIMEIRO.md`*
