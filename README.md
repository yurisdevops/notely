# Notely+

> Plataforma web para criação e compartilhamento de tarefas públicas e privadas.

O **Notely+** é uma aplicação moderna desenvolvida com as últimas tecnologias do **Next.js**, focada em fornecer uma experiência simples e intuitiva para gerenciar tarefas e interagir com outros usuários. O projeto inclui recursos avançados para a criação e gerenciamento de tarefas, com controle de visibilidade e interação social.

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Usar](#como-usar)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Futuras Implementações](#futuras-implementações)
- [Contato](#contato)

## Descrição do Projeto

O **Notely+** permite criar, compartilhar e gerenciar tarefas de forma prática e segura. Ele oferece:

- Criação de tarefas públicas ou privadas.
- Compartilhamento de URLs de tarefas públicas para fácil acesso.
- Adição e exclusão de comentários em tarefas públicas.
- Gerenciamento de tarefas privadas visíveis apenas pelo criador.

## Funcionalidades

- **Gerenciamento de Tarefas:** Criação, edição e exclusão de tarefas públicas e privadas.
- **Comentários em Tarefas Públicas:** Interação social com qualquer usuário autenticado.
- **Compartilhamento Fácil:** URLs únicas para tarefas públicas.
- **Validação Segura:** Login com Google utilizando **Auth.js**.
- **Integração de Banco de Dados:** Armazenamento e recuperação de dados no **Firestore**.
- **Interface Moderna:** Navegação responsiva com **CSS Modules**.

## Tecnologias Utilizadas

- **Next.js (App Router):** Framework moderno para construção de aplicações web.
- **Auth.js:** Sistema de autenticação integrado ao Google.
- **Firestore:** Banco de dados NoSQL para armazenar tarefas e comentários.
- **CSS Modules:** Estilização modular para componentes dinâmicos.

## Como Usar

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/notely.git
cd notely
```

### 2. Instalar Dependências

Com `npm`:

```bash
npm install
```

Com `yarn`:

```bash
yarn install
```

### 3. Configurar o Firebase

- Crie um projeto no [Firebase](https://firebase.google.com/).
- Adicione as credenciais no arquivo `.env`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=SEU_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=SEU_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=SEU_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=SEU_APP_ID
```

### 4. Executar o Projeto

Com `npm`:

```bash
npm run dev
```

Com `yarn`:

```bash
yarn dev
```

Acesse a aplicação no navegador: [https://notely-nu.vercel.app](https://notely-nu.vercel.app).

## Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Gera os arquivos para produção.
- **`npm run start`**: Inicia a aplicação em produção.

## Estrutura do Projeto

- **`src/app`**: Estrutura baseada no novo App Router do Next.js.
- **`src/components`**: Componentes reutilizáveis.
- **`src/pages`**: Páginas principais.
- **`src/styles`**: Estilos globais e específicos com CSS Modules.
- **`src/utils`**: Funções utilitárias e helpers.

## Futuras Implementações

- **Categorias de Tarefas:** Organização das tarefas por categorias definidas pelo usuário.
- **Notificações em Tempo Real:** Alertas sobre novos comentários ou mudanças nas tarefas públicas.
- **Modo Offline:** Acesso às tarefas privadas mesmo sem conexão à internet.

## Contato

Desenvolvido por [Yuri Souza](https://github.com/yurisdevops). Entre em contato para dúvidas ou sugestões!

---

### ✅ **Organize suas tarefas de maneira simples e interativa com o Notely+!**

--- 
