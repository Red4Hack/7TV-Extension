# 7TV Extension - Visão Geral do Projeto

## Propósito
Extensão de navegador para melhorar a experiência de visualização no Twitch e YouTube, adicionando emotes, funcionalidades, vanity e melhorias de performance.

## Tecnologias Principais
- **Framework**: Vue 3 (Composition API com `<script setup>`)
- **Linguagem**: TypeScript 5.9.3
- **Build Tool**: Vite 7.3.1
- **Gerenciador de Pacotes**: Bun
- **State Management**: Pinia 3.0.4
- **Banco de Dados**: Dexie.js 4.3.0 (IndexedDB)
- **GraphQL**: Apollo Client 4.0.11
- **Router**: Vue Router 4.6.4
- **i18n**: Vue-i18n 11.2.8
- **CSS**: SCSS/Sass

## Estrutura de Diretórios

```
src/
├── apollo/              # Configuração Apollo Client
├── app/                 # Componentes principais da UI
│   ├── chat/            # Componentes de chat
│   ├── emote-menu/      # Menu de emotes
│   ├── options/         # Opções/páginas de configurações
│   ├── paint-tool/      # Ferramenta de pintura
│   ├── settings/        # Componentes de settings
│   └── store/           # Loja de items
├── assets/              # Assets estáticos
│   ├── gql/             # Queries GraphQL
│   ├── style/           # Estilos globais
│   └── svg/             # Ícones e logos
├── background/          # Script background da extensão
├── common/              # Utilitários e código compartilhado
├── composable/          # Composables Vue reutilizáveis
├── content/             # Content script (loader)
├── db/                  # Configuração IndexedDB
├── directive/           # Diretivas Vue personalizadas
├── i18n/                # Internacionalização
├── site/                # Site-specific logic
│   ├── twitch.tv/       # Módulos específicos do Twitch
│   ├── kick.com/        # Módulos específicos do Kick
│   └── youtube.com/     # Módulos específicos do YouTube
├── store/               # Store Pinia
├── types/               # Definições de tipos TypeScript
├── ui/                  # Componentes UI genéricos
├── util/                # Utilitários
└── worker/              # Web Worker para processamento
```

## Plataformas Suportadas
- Twitch.tv
- YouTube.com
- Kick.com

## Arquitetura
- **Content Script**: Atua como loader para o site script
- **Site Script**: Lógica principal de modificação dos sites (executa no contexto do site, não em isolated world)
- **Background/Service Worker**: Gerencia permissões e sincronização de settings
- **Worker**: Web Worker para processamento intensivo

## Sistema de Módulos
Cada plataforma tem seus próprios módulos em `src/site/<plataforma>/modules/`:
- Chat (mensagens, input, moderadores)
- Emote Menu
- Settings
- Auth
- Player
- Mod Logs
- Custom Commands
- E mais...

## Recursos Principais
- Emotes animados e estáticos
- Badges e cosmetics
- Ferramentas de moderação
- Personalização de interface
- Chat highlights
- Sincronização entre plataformas
