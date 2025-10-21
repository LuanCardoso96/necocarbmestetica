# 📝 Instruções para Logos dos Parceiros

## 🖼️ Arquivos Necessários

Para que o header público funcione perfeitamente, você precisa adicionar as logos dos parceiros na pasta `/img/`:

### Arquivos Requeridos:
1. **`/img/logo2.png`** - Logo do primeiro parceiro
2. **`/img/logo3.png`** - Logo do segundo parceiro

### Especificações Recomendadas:
- **Formato**: PNG com fundo transparente
- **Altura**: 80-120px (será redimensionado automaticamente)
- **Largura**: Proporcional
- **Tamanho**: Máximo 200KB cada
- **Qualidade**: Alta resolução para retina displays

---

## 📍 Onde as Logos Aparecem

### Desktop
- **Header Público**: À direita da logo principal BM
- **Seção de Parceiros** (Home): Na seção dedicada

### Mobile
- **Menu Hamburguer**: Na parte inferior do menu expandido
- **Seção de Parceiros** (Home): Empilhadas verticalmente

---

## 🎨 Como Adicionar as Logos

### Opção 1: Copiar Arquivos
```bash
# Copie suas logos para a pasta img
cp caminho/para/sua/logo2.png img/logo2.png
cp caminho/para/sua/logo3.png img/logo3.png
```

### Opção 2: Download Direto
1. Coloque seus arquivos PNG na pasta `/img/`
2. Renomeie para `logo2.png` e `logo3.png`
3. O site detectará automaticamente

---

## 🔧 Customização Avançada

### Alterar Tamanho das Logos

#### No Header (`src/components/PublicHeader.jsx`)
```jsx
// Linha ~47 e ~48
className="h-8 object-contain"  // Mude h-8 para h-10, h-12, etc
```

#### No Home - Seção Parceiros (`src/pages/Home.jsx`)
```jsx
// Linha ~297
className="h-20 w-auto object-contain"  // Ajuste conforme necessário
```

---

## 🎯 Posicionamento Atual

### Header Desktop
```
[Logo BM] [BM Estética] | [Logo 2] [Logo 3] ... [Navegação] [Login]
```

### Header Mobile
```
[☰ Menu] [Logo BM] [BM Estética]

Quando expandido:
├─ Início
├─ Portfólio
├─ Projetos
├─ Depoimentos
├─ ─────────────
├─ [Logo 2] [Logo 3]
└─ [Faça Login]
```

---

## ⚠️ Caso Não Tenha as Logos

### Opção Temporária
Se você ainda não tem as logos, pode:

1. **Usar placeholders**: Qualquer imagem PNG
2. **Remover temporariamente**: Comentar as linhas no código
3. **Usar logos de exemplo**

### Para Remover Temporariamente

#### Em `PublicHeader.jsx`:
```jsx
// Comente as linhas 42-49
{/* <div className="hidden lg:flex items-center gap-3 ml-4 pl-4 border-l border-gray-300">
  <img src="/img/logo2.png" ... />
  <img src="/img/logo3.png" ... />
</div> */}
```

#### No menu mobile (linhas 88-96):
```jsx
{/* <div className="flex items-center justify-center gap-4 py-3 border-t border-gray-200">
  <img src="/img/logo2.png" ... />
  <img src="/img/logo3.png" ... />
</div> */}
```

---

## 🎨 Logos de Exemplo

Se quiser usar logos temporárias:

### Logo 2 (NecoCar estilizado):
Crie um PNG com:
- Texto: "NecoCar"
- Cor: Azul (#2563eb)
- Fundo: Transparente

### Logo 3 (Parceiro genérico):
Crie um PNG com:
- Texto: "Parceiro"
- Cor: Cinza (#6b7280)
- Fundo: Transparente

---

## ✅ Verificação

Para verificar se as logos estão carregando:
1. Abra o site: `http://localhost:5173/`
2. Abra o console do navegador (F12)
3. Verifique se há erros 404 para logo2.png ou logo3.png
4. Se houver erros, adicione os arquivos

---

## 💡 Dicas

- **Otimize suas logos**: Use ferramentas como TinyPNG
- **Use SVG**: Se possível, converta para SVG para melhor qualidade
- **Mantenha proporções**: Logos quadradas ou horizontais funcionam melhor
- **Teste responsividade**: Veja como ficam em diferentes telas

---

**🎨 Design por:** Equipe BM Estética  
**📅 Última atualização:** 21/10/2024

