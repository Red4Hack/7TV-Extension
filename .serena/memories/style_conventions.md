# Convenções de Código - 7TV Extension

## Estilo Geral

### Vue Components
- Usar `<script setup lang="ts">` para novos componentes
- Composition API é o padrão
- Imports organizados alfabeticamente
- Componentes em PascalCase (ex: `ChatModule.vue`)
- Componentes pequenos e focados

### TypeScript
- Tipos explícitos obrigatórios
- Interfaces para objetos
- Types para unions/primitives
- Sem comentários desnecessários (conforme instructions)

## Estrutura de Arquivos

### Componentes Vue
```
src/app/
├── component/
│   ├── Component.vue        # Template principal
│   ├── Component.ts         # Lógica separada (se necessário)
│   └── components/          # Sub-componentes
```

### Módulos de Site
```
src/site/twitch.tv/modules/
├── module-name/
│   ├── Module.vue           # Componente principal
│   ├── Module.ts            # Lógica do módulo
│   └── components/          # Componentes específicos
```

## Imports

### Alias `@/`
O alias `@/` aponta para `src/` e é usado em todos os imports:

```typescript
import { useConfig } from "@/composable/useSettings";
import FloatContext from "./FloatContext.vue";
import { dataSettings } from "./GlobalSettings";
```

### Ordem de Imports
1. Imports de Vue
2. Imports de bibliotecas externas
3. Imports de @/ (composables, utils, etc.)
4. Imports locais (./, ../)

## Convenções de Nomenclatura

### Variáveis e Funções
- camelCase para variáveis e funções
- Constantes em UPPER_SNAKE_CASE se verdadeiramente constantes
- Nomes descritivos e claros

### Interfaces e Types
- PascalCase para interfaces e types
- Prefixo `I` não é usado (ex: `UserSettings` não `IUserSettings`)
- Extensões declaradas explicitamente

### Componentes Vue
- PascalCase no arquivo e no uso
- Nomes descritivos (ex: `ChatMessage.vue`, `EmoteMenu.vue`)

## TypeScript

### Tipos
```typescript
// Interfaces para objetos
interface UserSettings {
    key: string;
    value: string;
}

// Types para unions
type LogType = "error" | "warn" | "debug" | "info";

// Generics quando necessário
function useConfig<T extends SevenTV.SettingType>(key: string): Ref<T>
```

### Vue Reactivity
```typescript
// Refs com tipo explícito
const settings = ref<string>("default");

// Reactive objects
const nodes = reactive<Record<string, SettingNode>>({});

// Computed
const computedValue = computed(() => {
    return something;
});
```

## CSS/SCSS

### Convenções
- SCSS é usado para estilização
- Classes em kebab-case
- Prefixo para evitar conflitos (ex: `.seventv-`)

### Estrutura
```scss
.component-class {
    // Layout
    display: flex;
    
    // Posicionamento
    position: relative;
    
    // Estilos
    color: var(--text-color);
    
    // Nested selectors quando apropriado
    &__element {
        // ...
    }
    
    &--modifier {
        // ...
    }
}
```

## Composables

### Padrão de Nomenclatura
- `use` prefix para composables (ex: `useSettings`, `useChatMessages`)
- Cada composable tem responsabilidade única
- Retornam objetos com estado e funções

### Exemplo
```typescript
export function useSettings() {
    const nodes = reactive({...});
    
    function register(newNodes: SettingNode[]) {
        // ...
    }
    
    return {
        nodes,
        register,
    };
}
```

## Logger

### Uso do Logger
```typescript
import { log } from "@/common/Logger";

// Níveis de log
log.debug("mensagem de debug");
log.info("mensagem de info");
log.warn("mensagem de warning");
log.error("mensagem de erro");

// Com objetos
log.debugWithObjects(["message"], [object]);
```

## GraphQL

### Queries
- Arquivos em `src/assets/gql/`
- Extensão `.gql.ts`
- Tipos gerados para responses

## Settings/Settings Nodes

### Registro de Settings
```typescript
const { register } = useSettings();

register([
    declareConfig("key", "string", {
        defaultValue: "default",
        // ...
    }),
]);
```

## Commits e Versionamento

- Semantic versioning (semver)
- Conventional Commits são bem-vindos
- Messages descritivas

## Outras Convenções

- Evitar any (usar unknown ou tipos específicos)
- Null checks explícitos
- Early returns preferidos
- Funções pequenas e focadas
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)
