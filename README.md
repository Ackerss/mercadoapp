# MercadoApp — Comparador de Preços de Supermercado

App mobile-first para comparar o custo-benefício de produtos no supermercado usando IA para extrair dados das fotos das etiquetas.

## Links

- **App online:** https://ackerss.github.io/mercadoapp/
- **Repositório GitHub:** https://github.com/Ackerss/mercadoapp
- **Deploy:** automático via GitHub Actions — push em `main` = publicado em ~2 min

## Como funciona

1. Tira foto da etiqueta/produto com a câmera
2. A IA (Google Gemini) extrai: nome, preço, quantidade, volume/peso
3. Usuário revisa e corrige os dados no formulário
4. O app calcula o custo por unidade (R$/litro, R$/metro, R$/kg)
5. Lista ranqueada mostra qual produto é a melhor opção

**Regra fundamental:** A IA só faz OCR (leitura da imagem). Todo cálculo matemático é feito em JavaScript puro — nunca pela IA.

## Funcionalidades

- **Análise por foto:** Gemini Vision API analisa etiquetas e embalagens
- **Edição antes de salvar:** todos os campos editáveis no formulário de validação
- **Editar item já salvo:** ícone ✏️ em cada card do comparativo — corrige sem deletar
- **Adicionar manualmente:** botão "+" abre formulário vazio, sem precisar de API Key
- **Ranking automático:** badge "Melhor Opção" + percentual de diferença nos outros
- **Persistência:** LocalStorage — a sessão sobrevive ao fechar o app

## Categorias suportadas

| Categoria | Cálculo |
|---|---|
| Cerveja / Bebida | R$ por Litro |
| Papel Higiênico | R$ por Metro (considera folha dupla/tripla) |
| Carvão | R$ por Kg |
| Iogurte | R$ por Litro |
| Outros | R$ por Litro (configurável) |

## Configuração

1. Acesse o app e clique em ⚙️ (Settings)
2. Cole sua **Gemini API Key** (obtenha em [aistudio.google.com](https://aistudio.google.com))
3. Escolha o modelo (Gemini 2.5 Flash recomendado)
4. Pronto — a câmera já funciona

> O botão "+" funciona sem API Key para adicionar itens manualmente.

## Stack Técnica

- **Frontend:** React 19 + Vite 8 + TailwindCSS v4
- **Ícones:** Lucide React
- **IA / OCR:** Google Gemini API (Vision)
- **Testes:** Vitest (math engine)
- **Storage:** LocalStorage (sem backend)
- **Hospedagem:** GitHub Pages

## Estrutura do Projeto

```
src/
  App.jsx                  # Shell principal — gerencia views e estado global
  components/
    CameraCapture.jsx      # Captura de foto(s) via câmera ou upload
    ProductForm.jsx        # Formulário de validação/edição do produto
    ProductList.jsx        # Lista comparativa com ranking
  store/
    useProductStore.js     # Estado global: add/update/remove/clear + rank automático
  utils/
    calculator.js          # calculateUnitCost() e rankProducts() — math engine puro JS
    visionApi.js           # Integração Gemini API — extractDataFromImages()
.github/
  workflows/
    deploy.yml             # GitHub Actions — build + deploy para GitHub Pages
```

## Desenvolvimento Local

```bash
npm install
npm run dev        # http://localhost:5173/mercadoapp/
npm run build      # build de produção em /dist
npm test           # roda testes do math engine
```

## Deploy

O deploy é automático: qualquer push para `main` dispara o workflow `.github/workflows/deploy.yml` que faz build e publica no GitHub Pages.

Para deploy manual (emergência):
```bash
npm run build
git add dist -f
git commit -m "manual deploy"
git push origin main
```

## Notas Importantes para Desenvolvedores

- `vite.config.js` tem `base: '/mercadoapp/'` — **obrigatório** para GitHub Pages funcionar
- `.claude/settings.local.json` está no `.gitignore` — não commitar
- A API Key do Gemini fica **apenas no localStorage do usuário** — nunca vai para o servidor
- O `gh` CLI pode ter token inválido no keyring — usar `git` diretamente se necessário
- Conta GitHub: **Ackerss** | Usuário: Jacson (NatuBrava Produtos Naturais)
