# BM Estética Automotiva

Aplicação web moderna para gestão de serviços de estética automotiva, desenvolvida com React + Vite.

## 🎥 Recursos Destacados

### Vídeo de Introdução
- **Vídeo inicial** (`/img/logoemvideo.mp4`) que aparece ao acessar o site pela primeira vez
- Após o término do vídeo, transição suave para o carrossel de imagens
- O vídeo é exibido apenas uma vez por sessão (armazenado no `sessionStorage`)
- Transição automática para as imagens hero após o vídeo

### Logos e Branding
- Logo principal animada na hero section
- Logo adicional (`/img/logo1.png`) na seção de parceiros
- Logo BM centralizada com animações de entrada

## 🚀 Executando o Projeto

### Desenvolvimento
```bash
npm install
npm run dev
```

O servidor de desenvolvimento será iniciado em `http://localhost:5173/`

### Build de Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## 📁 Estrutura de Pastas

```
├── img/                      # Arquivos de mídia
│   ├── logoemvideo.mp4      # Vídeo de introdução
│   └── logo1.png            # Logo adicional
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/             # Componentes de UI (shadcn/ui)
│   │   └── perfil/         # Componentes de perfil
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.jsx        # Página inicial com vídeo
│   │   ├── Agendamento.jsx # Sistema de agendamento
│   │   ├── Servicos.jsx    # Catálogo de serviços
│   │   ├── Perfil.jsx      # Perfil do cliente
│   │   └── Admin*.jsx      # Páginas administrativas
│   ├── hooks/              # React hooks customizados
│   ├── lib/                # Utilitários
│   └── utils/              # Funções auxiliares
```

## 🎨 Funcionalidades

### Para Clientes
- ✅ Visualização de serviços disponíveis
- ✅ Agendamento online de serviços
- ✅ Histórico de serviços realizados
- ✅ Sistema de pontos de fidelidade
- ✅ Código de indicação para amigos
- ✅ Visualização de fotos antes/depois

### Para Administradores
- ✅ Dashboard com estatísticas
- ✅ Gerenciamento de agendamentos
- ✅ Cadastro e edição de serviços
- ✅ Visualização de clientes
- ✅ Sistema de notificações
- ✅ Upload de fotos de serviços

## 🎬 Como Funciona o Vídeo Inicial

1. **Primeira Visita**: Ao entrar no site pela primeira vez, o vídeo `logoemvideo.mp4` é reproduzido automaticamente
2. **Fim do Vídeo**: Quando o vídeo termina, há uma transição suave para o carrossel de imagens
3. **Sessão Persistente**: O sistema salva no `sessionStorage` que o vídeo foi visto
4. **Próximas Visitas**: Durante a mesma sessão, o vídeo não é reproduzido novamente
5. **Nova Sessão**: Ao fechar e reabrir o navegador, o vídeo será reproduzido novamente

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações e transições
- **React Router** - Navegação entre páginas
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos
- **date-fns** - Manipulação de datas

## 🎯 Páginas Principais

- `/` - Home com vídeo de introdução e carrossel
- `/Servicos` - Catálogo de serviços
- `/Agendamento` - Sistema de agendamento
- `/Perfil` - Perfil do cliente
- `/AdminDashboard` - Dashboard administrativo
- `/AdminAgendamentos` - Gerenciar agendamentos
- `/AdminClientes` - Gerenciar clientes
- `/AdminServicos` - Gerenciar serviços

## 📝 Observações

- Os dados são mockados (não há backend integrado)
- Sistema de autenticação simplificado
- Email admin configurado: `luancr71996@gmail.com`
- Todas as funcionalidades são client-side

## 🎨 Customização

### Trocar o Vídeo de Introdução
1. Substitua o arquivo `/img/logoemvideo.mp4`
2. Mantenha o mesmo nome ou atualize em `src/pages/Home.jsx`

### Trocar Logos
- Logo principal: Linha 180 em `Home.jsx`
- Logo adicional: `/img/logo1.png`

## 📦 Build e Deploy

O projeto gera arquivos estáticos na pasta `dist/` após o build. Pode ser hospedado em:
- Vercel
- Netlify
- GitHub Pages
- Qualquer servidor de arquivos estáticos

## 🤝 Contribuindo

Este é um projeto privado. Para suporte, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para BM Estética Automotiva**
"# necocarbmestetica" 
