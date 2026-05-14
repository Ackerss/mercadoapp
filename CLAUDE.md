# MercadoApp — Contexto para IAs

## Repositório e Deploy

- **GitHub:** https://github.com/Ackerss/mercadoapp (conta GitHub: Ackerss)
- **URL online:** https://ackerss.github.io/mercadoapp/
- **Deploy:** automático via GitHub Actions — push em `main` = deploy em ~2 min

## O que é o projeto

App mobile-first para comparar preços no supermercado. O usuário tira foto da etiqueta, a IA (Gemini) extrai os dados, e o app calcula e ranqueia qual produto é mais barato por unidade (litro, metro, kg etc).

**Regra fundamental:** A IA só faz OCR (extração de dados da imagem). Todo cálculo matemático é feito em JS puro — nunca pela IA.

## Stack

- React 19 + Vite 8 + TailwindCSS v4 + Lucide React
- Vitest para testes do math engine
- Google Gemini API para análise de imagens
- LocalStorage para persistência da sessão

## Estrutura

```
src/
  App.jsx                  — shell, gerencia views ('list' | 'capture' | 'form') e estado
  components/
    CameraCapture.jsx      — captura de foto(s)
    ProductForm.jsx        — formulário validação/edição (props: onSubmit, onCancel, initialData, isEditing)
    ProductList.jsx        — lista comparativa (props: products, onRemove, onClear, onEdit)
  store/
    useProductStore.js     — addProduct, updateProduct, removeProduct, clearProducts + rankProducts automático
  utils/
    calculator.js          — calculateUnitCost(product), rankProducts(products)
    visionApi.js           — extractDataFromImages, AVAILABLE_MODELS, DEFAULT_MODEL
```

## Funcionalidades prontas

- Foto → Gemini analisa → ProductForm pré-preenchido para o usuário validar/editar → salva
- Botão "+" abre ProductForm vazio (sem precisar de API Key — funciona offline)
- Ícone lápis (✏️) em cada item do comparativo → edita sem deletar (usa updateProduct)
- Categorias: Cerveja/Bebida, Papel Higiênico, Carvão, Iogurte, Outros
- Ranking automático: badge "Melhor Opção" + % de diferença nos outros
- Settings: API Key e modelo Gemini (salvo em localStorage)

## Avisos importantes — LEIA ANTES DE MEXER

### ⚠️ TailwindCSS v4 — sintaxe específica
O projeto usa **TailwindCSS v4** com o plugin `@tailwindcss/postcss`. A sintaxe do CSS é DIFERENTE da v3:

**CORRETO (v4) — `src/index.css`:**
```css
@import "tailwindcss";
```

**ERRADO (v3 — quebra o app):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Se o CSS parecer que não está aplicando (botões sem cor, layout sem estilo, `fixed` não funcionando), verifique `src/index.css` — provavelmente foi revertido para a sintaxe v3. O CSS compilado correto tem ~24 kB. Se estiver ~8 kB, está errado.

### ⚠️ Force push apaga correções do remoto
Nunca fazer force push sem antes verificar se o remoto tem correções que o local não tem. O histórico do GitHub (`git log origin/main`) pode conter fixes importantes não presentes no local.

### ⚠️ Git
- `vite.config.js` tem `base: '/mercadoapp/'` — OBRIGATÓRIO para GitHub Pages funcionar
- `.claude/settings.local.json` está no `.gitignore` — não commitar
- `gh auth status` pode mostrar token inválido — usar `git` diretamente para push
- `git push --force` só se o código local for confirmadamente mais novo

## Usuário

Jacson — dono da NatuBrava (loja de produtos naturais). Usa o app no celular no supermercado para decidir qual produto compra. Email: jacsonsax@gmail.com
