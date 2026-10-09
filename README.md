# Birdwatch 🐦

## 💡 A Ideia (The Idea)
Birdwatch é uma plataforma de rede social moderna, inspirada na fluidez e no design focado em texto do Threads e do antigo Twitter. A ideia central é criar um ambiente limpo e responsivo para microblogging, onde os usuários podem compartilhar pensamentos rápidos, criar "fios" (threads) de conversas e interagir de forma intuitiva.

## 🎯 O Objetivo (The Objective)
O principal objetivo do Birdwatch é oferecer uma experiência de usuário (UX) excepcional e moderna. Isso inclui:
- **Autenticação Progressiva:** Um fluxo de login amigável que primeiro pede o e-mail e depois decide se o usuário precisa digitar a senha (se já tiver conta) ou criar um perfil (se for novo).
- **Interface Fluida e Responsiva:** Uma interface baseada em duas colunas, adaptável para mobile e desktop.
- **Interações Rápidas:** Foco em tornar o ato de postar, curtir e comentar o mais rápido e visualmente agradável possível.

## 🚀 O Que Já Temos Feito (Current Features)
Até o momento, estabelecemos a base visual e arquitetural do projeto:

- **Setup do Projeto:** Estruturado com `Next.js 16` (App Router), `Tailwind CSS`, `Ant Design` e `Lucide React` para ícones.
- **Backend/Auth:** Configuração inicial com `Supabase` para banco de dados e autenticação de usuários.
- **Página de Login Personalizada:** 
  - Layout *split-screen* com um background abstrato ("Blue Liquid/Mountains").
  - Fluxo de autenticação progressiva implementado via *Server Actions* (Email -> Checagem -> Senha/Cadastro).
- **Feed Principal (Estilo Threads):**
  - **FeedLayout:** Container responsivo de duas colunas.
  - **PostComposer:** Área dedicada para criar novas postagens.
  - **FeedCard:** Componente de postagem que exibe autor, avatar, conteúdo, botões de ação (curtir, comentar) e linhas visuais conectando "fios" (threads).
  - **RightSidebar:** Barra lateral exibindo sugestões de usuários e tópicos "Em Alta no Birdwatch".
- **Testes:** Script Python criado para gerar usuários de teste rapidamente (`demo@blast.com`).

## 🛠 Tecnologias Utilizadas
- **Frontend:** Next.js, React, Tailwind CSS, Ant Design.
- **Backend & Auth:** Supabase.
- **Ícones:** Lucide React & Ant Design Icons.
