# Arquitetura do Sistema - 7TV Extension

## Visão Geral da Arquitetura

A extensão 7TV é uma browser extension que utiliza uma arquitetura híbrida combining browser extension APIs com site script execution.

## Componentes Principais

### 1. Content Script (`src/content/content.ts`)
- Atua como loader para o site script
- Carrega o site script apropriado baseado no domínio
- Não usa Isolated Worlds para permitir acesso a valores internos do site

### 2. Site Script (`src/site/`)
- Executa no contexto do site (não isolation)
- Módulos específicos por plataforma:
  - `twitch.tv/`
  - `youtube.com/`
  - `kick.com/`
- Suporta Hot Module Replacement (HMR)

### 3. Background Script (`src/background/`)
- Gerencia permissões da extensão
- Mantém cópia do IndexedDB para sincronização cross-site
- Distribui configurações atualizadas para sites

### 4. Worker (`src/worker/`)
- Web Worker para processamento intensivo
- Handlers de eventos específicos:
  - `cosmetic.handler.ts`
  - `emote-set.handler.ts`
  - `entitlement.handler.ts`
  - `user.handler.ts`

## Fluxo de Dados

```
User Settings → IndexedDB (Dexie.js)
                    ↓
        Background Script (sync)
                    ↓
        Content Script → Site Script (HMR)
                    ↓
        Vue Components → DOM
```

## Sistema de Módulos

Cada plataforma tem seu próprio sistema de módulos em `src/site/<plataforma>/modules/`:

### Estrutura de Módulo
```
modules/
├── module-name/
│   ├── Module.vue         # Componente principal
│   ├── Module.ts          # Lógica
│   └── components/        # Sub-componentes
```

### Módulos Comuns
- Chat (mensagens, input, moderação)
- Emote Menu
- Settings
- Auth
- Player
- Mod Logs

## Gerenciamento de Estado

### Settings (`src/composable/useSettings.ts`)
- Usa IndexedDB (Dexie.js) como storage
- Reativo via Vue reactive/ref
- Sincronização com FrankerFaceZ

### Apollo Client (`src/apollo/`)
- GraphQL queries para API 7TV
- Composables para uso em componentes

### Store Pinia (`src/store/`)
- Estado global compartilhado
- Actions e Getters tipados

## Composables Principais

- `useSettings()` - Gerenciamento de configurações
- `useChatMessages()` - Mensagens de chat
- `useChatEmotes()` - Emotes no chat
- `useChatModeration()` - Ferramentas de moderação
- `useCosmetics()` - Cosmetics e personalização
- `useModule()` - Sistema de módulos

## Tipos Globais (`src/types/`)

- `app.d.ts` - Tipos gerais da aplicação
- `twitch.d.ts` - Tipos específicos do Twitch
- `youtube.d.ts` - Tipos específicos do YouTube
- `kick.d.ts` - Tipos específicos do Kick

## Build System

### Vite Configurations
- `vite.config.mts` - App principal
- `vite.config.background.mts` - Background
- `vite.config.content.mts` - Content script
- `vite.config.worker.mts` - Web Worker
- `vite.config.hosted.mts` - Versão hosted

### Targets de Build
- App: Interface principal da extensão
- Background: Service worker
- Content: Loader script
- Worker: Web Worker processing

## Styles

### Estrutura de Estilos
- Global styles em `src/assets/style/`
- SCSS com variáveis CSS
- Ícones SVG em `src/assets/svg/`
- Sistema de icons unificado

## Database Schema (Dexie.js)

- `settings` - Configurações do usuário
- `emotes` - Cache de emotes
- `users` - Dados de usuários
- `cosmetics` - Cosmetics personalizados

## Comunicação

### Cross-script
- `browser.runtime.sendMessage()`
- `browser.runtime.onMessage`
- Port connections para comunicação persistente

### Dentro do Site Script
- Vue props e emits
- Composables compartilhados
- Event Bus para eventos globais

## Performance Considerations

- Web Worker para processamento intensivo
- Lazy loading de componentes
- Virtual scrolling para chats longos
- IndexedDB para dados persistentes
- HMR para desenvolvimento rápido
