# Comandos Sugeridos - 7TV Extension

## Instalação e Dependências

```bash
# Instalar dependências
make deps
# ou
bun install

# Dependências do sistema (se necessário)
# O projeto usa Bun, então certifique-se de ter ele instalado
```

## Desenvolvimento

```bash
# Iniciar modo desenvolvimento com HMR
bun start
# ou
make dev

# O comando start executa:
# 1. bun build:dev (compila todas as seções em modo dev)
# 2. vite --mode dev (inicia servidor Vite)
```

## Build

```bash
# Build de produção (verifica tipos com vue-tsc)
make production
# ou
bun build:prod

# Build de desenvolvimento
make dev
# ou
bun build:dev

# Build noturna (non-stable)
BRANCH=nightly bun build:prod
```

## Linting e Formatação

```bash
# Verificar formatação
bun format
# ou
make format

# Verificar lint JavaScript/TypeScript
bun lint:js
# ou
bun lint:js:fix (para corrigir automaticamente)

# Verificar lint de estilos
bun lint:style

# Executar todos os lints
bun lint

# Corrigir todos os lints automaticamente
bun lint:fix
```

## Preview

```bash
# Preview do build
bun preview
# ou
make preview
```

## Estrutura de Build

O projeto é dividido em seções que são compiladas separadamente:

```bash
# Build individual de cada seção
bun build:section:app      # Interface principal
bun build:section:background  # Background script
bun build:section:content     # Content script
bun build:section:worker      # Web Worker
bun build-hosted:section:worker  # Worker para versão hosted
bun build-hosted:section:site    # Site para versão hosted
```

## Watch Mode

```bash
# Watch mode para desenvolvimento rápido
bun watch
# ou
make watch

# Watch de seções individuais
bun watch:section:background
bun watch:section:content
bun watch:section:worker
```

## Scripts Úteis

```bash
# Compilar emojis
bun script:compile-emoji
```

## Git Commands

```bash
# Verificar status do repositório
git status

# Ver alterações não commitadas
git diff

# Ver commits recentes
git log

# Ver alterações staged
git diff --cached
```

## Gerenciamento de Arquivos

```bash
# Listar arquivos
ls -la

# Buscar arquivos por padrão
find . -name "*.vue"
find . -name "*.ts"

# Buscar conteúdo em arquivos
grep -r "termo_buscado" --include="*.ts"
```

## Ambiente de Desenvolvimento

1. Os arquivos compilados ficam em `dist/`
2. Para testar, adicione a pasta `dist/` como extensão não empacotada no Chrome
3. HMR funciona automaticamente em modo dev
4. Changes refletem em tempo real

## Variáveis de Ambiente

```bash
# Build noturno
BRANCH=nightly bun build:prod
```

## Notas Importantes
- O projeto usa Bun como gerenciador de pacotes e runtime
- TypeScript é verificado com `vue-tsc` antes de builds de produção
- Prettier é usado para formatação
- ESLint para lint de JS/TS
- Stylelint para lint de estilos (SCSS/CSS)
