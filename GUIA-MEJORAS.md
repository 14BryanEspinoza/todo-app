# Guía de mejora — todo-app

Documento de trabajo para corregir el proyecto fase por fase y entender el porqué de cada cambio.

Estado verificado al crear esta guía:

- commit `d666764`
- `pnpm build` → falla (exit 2, 6 errores de `tsc`)
- `pnpm lint` → pasa (falso positivo, ver Fase 10)
- `tsconfig.app.json` sin `strict`
- cero estado en `src/`: no hay `useState`, `useReducer` ni `useContext`
- cero tests

La meta no es "que compile". La meta es que entiendas qué decisión arquitectónica causa cada error. Si solo copias y pegas, el proyecto va a compilar y vos no vas a haber aprendido nada.

---

## Cómo usar esta guía

1. **Una fase a la vez.** No empieces la siguiente hasta cerrar la anterior.
2. **Regla de oro:** al final de cada fase ejecutás `pnpm build && pnpm lint`. Desde la Fase 6 agregás `&& pnpm test`. Si algo queda en rojo, no avanzas.
3. **Un commit por fase.** Mensaje en inglés, formato Conventional Commits, sin atribución de IA.
4. **Si algo falla:** guardá el error literal completo. No lo interpretes de memoria. La mitad de los problemas de este proyecto se resuelven leyendo el mensaje entero de `tsc`.

```bash
# esto lo vas a repetir en cada fase
pnpm build && pnpm lint
```

Mapa de trabajo:

| Fase | Objetivo                              | Verificación        | Tiempo |
| ---- | ------------------------------------- | ------------------- | ------ |
| 0    | Rama y línea base                     | `git status` limpio | 5 min  |
| 1    | `Button` deja de perder props nativos | 4 errores menos     | 20 min |
| 2    | Barrel completo                       | `pnpm build` verde  | 15 min |
| 3    | Romper ciclos + aliases con wildcard  | `grep` en cero      | 30 min |
| 4    | `strict: true`                        | build verde         | 20 min |
| 5    | Modelo de dominio                     | build verde         | 20 min |
| 6    | Reducer puro + tests                  | `pnpm test` verde   | 90 min |
| 7    | Provider + persistencia               | test de provider    | 45 min |
| 8    | Cablear la UI                         | app funciona        | 3-4 h  |
| 9    | Markup y accesibilidad                | checklist           | 1 h    |
| 10   | Tooling que te protege                | CI completo         | 45 min |
| 11   | Layout, responsive y metadata         | revisión visual     | 1 h    |

---

## Fase 0 — Punto de partida

**Objetivo:** tener una rama y una línea base para comparar.

```bash
git switch -c fix/build-and-architecture
pnpm build 2>&1 | tee /tmp/build-antes.txt
```

Guardá esa salida. En la Fase 2 la vas a comparar.

**Por qué:** sin línea base no podés saber si un error es nuevo o si ya estaba. Es la diferencia entre depurar y adivinar.

**Commit:** no hay nada que commitear todavía.

---

## Fase 1 — Build verde I: `Button`

**Objetivo:** eliminar los 4 errores de `ariaLabel`.

`src/components/Atoms/Button.tsx` declara los props a mano:

```tsx
interface Props {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
  className?: string;
}
```

Y cuatro lugares le pasan `ariaLabel`:

- `Atoms/ConfirmDialog.tsx:16` y `:24`
- `Atoms/TaskItems.tsx:31`
- `Molecules/TaskForm.tsx:33`

**Por qué es un error de arquitectura, no de tipeo:** un componente que envuelve un elemento nativo debe **extender los props del elemento nativo**. Si los reescribís a mano, cada prop de HTML que necesites la tenés que agregar una por una. Por eso hoy `Button` no puede recibir `aria-label`, `disabled`, `data-*`, `onMouseEnter`, ni `form`. Y por eso `onClick` es obligatorio: no debería serlo.

**Cómo se arregla:**

```tsx
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'>;

const styleBase =
  'flex cursor-pointer gap-2 transition-all duration-300 hover:scale-110 active:scale-90';

export const Button = ({ type = 'button', className = '', ...rest }: Props) => {
  return (
    <button type={type} className={`${styleBase} ${className}`} {...rest} />
  );
};
```

Cuatro cosas para mirar y entender:

- `ComponentPropsWithoutRef<'button'>` trae **todos** los props válidos de un `<button>`, incluidos `children` y `onClick` (opcional).
- `WithoutRef` evita pedirte un `ref` que el componente no reenvía. Si más adelante necesitás `ref`, ahí sí pasás a `forwardRef` o a la prop `ref` directa de React 19.
- `type = 'button'` como default no es decoración: **un `<button>` dentro de un `<form>` sin `type` es `submit` por defecto**. Es el bug clásico que hace que un botón "Cancelar" envíe el formulario. Poner `button` por defecto y `submit` explícito donde corresponde es la política sana.
- `...rest` va al final para que no pise nada que hayas decidido vos.

**Trampa:** si el consumidor pasa `className`, `rest` también lo traería y chocaría con el tuyo. Por eso `className` se destructura aparte y nunca llega a `rest`.

**Verificación:**

```bash
pnpm exec tsc -b --force
```

Pasás de 6 errores a 2 (los de barrel, Fase 2). `--force` ignora el caché incremental de `tsc -b`, porque a veces te muestra errores viejos.

**Commit:** `fix(button): forward native button props via ComponentPropsWithoutRef`

---

## Fase 2 — Build verde II: barrel completo

**Objetivo:** `pnpm build` en verde por primera vez.

`src/components/index.ts` exporta 10 de los 17 componentes. Faltan:

`BarProgress`, `ConfirmDialog`, `Link`, `TaskItems`, `TaskForm`, `TaskList`, `Footer`.

Y hay dos consumidores que ya los importan:

- `Molecules/TaskList.tsx:2` → `import { TaskItems } from '@components'`
- `Organism/Footer.tsx:2` → `import { Link } from '@components'`

**Por qué importa:** un barrel es un contrato. Si dice "acá está la API pública del design system" y le faltan la mitad de las piezas, todo el que importe de ahí está apostando a que existe. Y `tsc` te lo cobra.

**Cómo:**

```ts
// Atoms
export * from './Atoms/Badged';
export * from './Atoms/BarProgress';
export * from './Atoms/Button';
export * from './Atoms/ConfirmDialog';
export * from './Atoms/Input';
export * from './Atoms/Link';
export * from './Atoms/SearchBar';
export * from './Atoms/TaskItems';
export * from './Atoms/Time';

// Molecules
export * from './Molecules/Filters';
export * from './Molecules/Statistics';
export * from './Molecules/TaskForm';
export * from './Molecules/TaskList';
export * from './Molecules/Title';
export * from './Molecules/ToggleTheme';

// Organism
export * from './Organism/Aside';
export * from './Organism/Footer';
```

Dejá los comentarios por capa. En un barrel, el orden **es** documentación.

**Verificación:**

```bash
pnpm build
echo $?   # tiene que imprimir 0
```

Primera victoria real. Guardá la salida y comparala con `/tmp/build-antes.txt`.

**Commit:** `fix(components): complete public barrel exports`

---

## Fase 3 — Romper el ciclo del barrel

**Objetivo:** que `src/components` deje de importarse a sí mismo.

Hoy nueve archivos hacen esto:

```tsx
import { Input } from '@components'; // dentro de components/Atoms/SearchBar.tsx
```

Es un ciclo ESM real: `index.ts` importa `Atoms/SearchBar.tsx`, que importa `index.ts`. Funciona solo porque las bindings se resuelven en tiempo de render y nadie usa el valor durante la carga del módulo. El día que alguien lo haga, explota con un `undefined` que no vas a poder rastrear.

**La causa de fondo** está en `tsconfig.app.json`:

```json
"paths": {
  "@/*": ["./src/*"],
  "@components": ["./src/components/"],
  "@models": ["./src/models/"],
  "@utils": ["./src/utils/"]
}
```

Sin wildcard, `@components` solo resuelve al barrel. No hay forma de decir `@components/Atoms/Button`. Por eso todos los imports internos convergen al mismo archivo y se arma el ciclo. La herramienta te empujó al diseño equivocado.

**Paso 1 — aliases con wildcard:**

```json
"paths": {
  "@/*": ["./src/*"],
  "@components": ["./src/components/index.ts"],
  "@components/*": ["./src/components/*"],
  "@models": ["./src/models/index.ts"],
  "@models/*": ["./src/models/*"],
  "@utils": ["./src/utils/index.ts"],
  "@utils/*": ["./src/utils/*"]
}
```

`@models/index.ts` todavía no existe: crealo en la Fase 5. Por ahora dejá solo `"@models/*"` y agregá el barrel después, o creá un `models/index.ts` vacío ahora.

**Paso 2 — sacar `vite-tsconfig-paths`:**

Vite 8 resolvió esto nativo. `vite.config.ts` hoy tiene dos fuentes de verdad para los mismos aliases:

```ts
// antes
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});
```

```ts
// después
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
});
```

```bash
pnpm remove vite-tsconfig-paths
```

**Paso 3 — regla de imports.** Esta es la regla que resuelve el problema para siempre:

> Dentro de `src/components/`, **nunca** se importa desde `@components`. Se usa ruta relativa.
> Fuera de `src/components/` (por ejemplo `App.tsx`), se usa `@components`.

Queda así:

| Archivo                  | Antes                | Después                                                |
| ------------------------ | -------------------- | ------------------------------------------------------ |
| `Atoms/SearchBar.tsx`    | `from '@components'` | `from './Input'`                                       |
| `Atoms/TaskItems.tsx`    | `from '@components'` | `from './Button'`                                      |
| `Molecules/Filters.tsx`  | `from '@components'` | `from '../Atoms/Button'`                               |
| `Molecules/TaskForm.tsx` | `from '@components'` | `from '../Atoms/Button'` + `from '../Atoms/Input'`     |
| `Molecules/TaskList.tsx` | `from '@components'` | `from '../Atoms/TaskItems'`                            |
| `Organism/Aside.tsx`     | `from '@components'` | `'../Molecules/Title'`, `'../Molecules/Filters'`, etc. |
| `App.tsx`                | `from '@components'` | sin cambios                                            |

Un átomo nunca importa de una molécula, una molécula nunca importa de un organismo. La dependencia apunta en un solo sentido: `Organism → Molecules → Atoms`. Si respetás esa dirección, el ciclo es imposible por construcción.

**Verificación:**

```bash
grep -rn "from '@components'" src/components   # tiene que devolver cero resultados
pnpm build
pnpm dev   # smoke test: la página sigue renderizando el aside
```

**Commit:** `refactor(components): use relative intra-layer imports to break barrel cycle`

---

## Fase 4 — `strict: true`

**Objetivo:** activar el chequeo de tipos que hoy está apagado.

`tsconfig.app.json` tiene `noUnusedLocals` y `noUnusedParameters`, pero le falta lo importante:

```json
"strict": true,
"lib": ["ES2023", "DOM", "DOM.Iterable"],
```

**Por qué ahora y no después:** con 600 líneas son 20 minutos. Con 6000 líneas son dos semanas y un fin de semana arruinado. `strict` incluye `strictNullChecks`, que es el que evita el 80% de los crashes de runtime (`Cannot read properties of undefined`).

**Qué esperar:** van a aparecer errores nuevos. Eso es el punto: son bugs que ya existían y estaban invisibles.

**La trampa grande:** no los tapes. `any`, `@ts-ignore` y `!` (non-null assertion) convierten un error de compilación en un bug de producción. Si no sabés el tipo, usá `unknown` y angostá con un chequeo real.

```tsx
// mal
const data = JSON.parse(raw) as Task[];

// bien
const data: unknown = JSON.parse(raw);
if (!Array.isArray(data)) return [];
```

**Verificación:**

```bash
pnpm build
grep -rn ": any\|@ts-ignore\|as any" src   # cero resultados
```

**Commit:** `chore(ts): enable strict mode in app tsconfig`

---

## Fase 5 — Modelo de dominio

**Objetivo:** definir qué **es** una tarea, antes de tocar un solo componente.

Esto es el corazón de todo el problema del proyecto. Tenés 17 componentes y ningún modelo. `src/models/schema.ts` define un DTO de formulario, no una entidad:

```ts
export const taskSchema = z.object({
  task: z.string().min(4, '...').max(20, '...'),
});
```

Eso valida **entrada del usuario**. Una tarea real necesita más.

**Creá `src/models/task.ts`:**

```ts
export type TaskId = string;

export interface Task {
  readonly id: TaskId;
  title: string;
  completed: boolean;
  readonly createdAt: string; // ISO 8601
}

export type TaskFilter = 'all' | 'active' | 'completed';
```

**Por qué cada decisión:**

- **DTO ≠ entidad.** El formulario es dato no confiable que entra. `Task` es dato ya validado que se persiste. Tienen ciclos de vida distintos y por eso viven en archivos distintos. Mezclarlos es el motivo por el que `TaskItems.tsx` terminó inventándose su propio `interface Props { id: string; task: string }`.
- **`id` y `createdAt` los genera la app, no el usuario.** Si los dejás fuera del modelo, no podés hacer `key={task.id}` ni ordenar.
- **`readonly` donde corresponde.** `id` y `createdAt` no cambian nunca. Que el compilador lo sepa es documentación que se verifica sola.
- **`TaskFilter` como union, no `enum`.** Tu tsconfig tiene `erasableSyntaxOnly: true`: los `enum` de TypeScript generan código en runtime y están prohibidos. Union type es más liviano y hace mejor narrowing.

**Renombrá el campo del schema.** `taskSchema` usa `task` como nombre de campo; la entidad usa `title`. Son el mismo concepto con dos nombres, y eso se paga después. Cambiá el schema a `title` y ajustá `TaskForm.tsx` y `SearchBar.tsx`. Se hace ahora, gratis.

```ts
// src/models/schema.ts
import { z } from 'zod';

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'La tarea tiene que tener al menos 5 caracteres')
    .max(20, 'La tarea no puede superar los 20 caracteres'),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
```

Fijate las tres correcciones silenciosas que van ahí:

- `.trim()` antes de `.min()`: `"    "` (cuatro espacios) hoy pasa la validación.
- `.min(5)` porque el mensaje decía "más de 4". `min(4)` acepta 4. El validador y el mensaje tenían que decir lo mismo.
- El tipo se llama `TaskFormValues`, no `TaskFormType`. "Values" dice qué es: los valores de entrada.

**Creá `src/models/index.ts`:**

```ts
export * from './task';
export * from './schema';
```

**Verificación:** `pnpm build` sigue verde. Todavía no hay nada que probar.

**Commit:** `feat(models): add Task domain model and fix form schema semantics`

---

## Fase 6 — Reducer puro + tests

**Objetivo:** toda la lógica de negocio, testeada, sin abrir un navegador.

Esta es la fase más importante de la guía. Si entendés por qué el reducer es puro, entendés cómo se testea cualquier aplicación.

**Instalación** (verificado: Vitest 5 soporta Vite 8, Testing Library 16 soporta React 19):

```bash
pnpm add -D vitest @vitest/coverage-v8 jsdom \
  @testing-library/react @testing-library/dom \
  @testing-library/jest-dom @testing-library/user-event
```

**`vite.config.ts`:**

```ts
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/state/**'],
    },
  },
});
```

Usá `defineConfig` de `vitest/config`, no de `vite`, para que la clave `test` esté tipada.

**`src/test/setup.ts`:**

```ts
import '@testing-library/jest-dom/vitest';
```

**Scripts en `package.json`:**

```json
"typecheck": "tsc -b",
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

**El reducer — `src/state/tasksReducer.ts`:**

```ts
import type { Task, TaskId, TaskFilter } from '../models/task';

export interface TasksState {
  tasks: Task[];
  filter: TaskFilter;
}

export type TasksAction =
  | { type: 'added'; id: TaskId; title: string; createdAt: string }
  | { type: 'toggled'; id: TaskId }
  | { type: 'removed'; id: TaskId }
  | { type: 'completed-cleared' }
  | { type: 'filter-changed'; filter: TaskFilter };

export const initialTasksState: TasksState = {
  tasks: [],
  filter: 'all',
};
```

**Fijate el detalle clave y no lo saltees:** la acción `added` recibe `id` y `createdAt` **desde afuera**. El reducer no genera el id ni la fecha. Eso lo hace puro: mismo estado + misma acción = mismo resultado, siempre. Si adentro llamás `crypto.randomUUID()` o `new Date()`, tu test no puede predecir el resultado y la lógica deja de ser testeable. Esa es la razón por la que existen los reducers.

**El reducer (esqueleto para que lo completes):**

```ts
export function tasksReducer(
  state: TasksState,
  action: TasksAction,
): TasksState {
  switch (action.type) {
    case 'added':
      // devolver un estado NUEVO con la tarea al final
      break;

    case 'toggled':
      // mapear: la que coincide con action.id invierte completed
      break;

    case 'removed':
      // filtrar por id
      break;

    case 'completed-cleared':
      // quedarse solo con las no completadas
      break;

    case 'filter-changed':
      // cambiar filter sin tocar tasks
      break;
  }
}
```

Regla no negociable: **nunca mutes `state`**. Nada de `state.tasks.push()` ni `state.tasks[i].completed = true`. Siempre `map`, `filter` y `[...]`. React decide si re-renderizar comparando referencias; si mutás, la referencia no cambia y la UI se queda vieja.

**Ahora los tests — escribilos ANTES de implementar.** Ciclo RED → GREEN:

1. Escribís el test. Falla. Eso confirma que el test mide algo real.
2. Implementás.
3. Pasa.

`src/state/tasksReducer.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { initialTasksState, tasksReducer } from './tasksReducer';
import type { Task } from '../models/task';

const task = (id: string, completed = false): Task => ({
  id,
  title: `Tarea ${id}`,
  completed,
  createdAt: '2026-11-13T00:00:00.000Z',
});

const withTasks = (...tasks: Task[]) => ({
  ...initialTasksState,
  tasks,
});

describe('tasksReducer', () => {
  it('agrega la tarea al final', () => {
    const state = tasksReducer(initialTasksState, {
      type: 'added',
      id: 'a',
      title: 'Comprar pan',
      createdAt: '2026-11-13T00:00:00.000Z',
    });

    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0]).toEqual({
      id: 'a',
      title: 'Comprar pan',
      completed: false,
      createdAt: '2026-11-13T00:00:00.000Z',
    });
  });
});
```

Ese primer test te obliga a decidir algo que no habías decidido: **¿quién arma el objeto `Task`?** Dos opciones, y las dos son válidas:

- El reducer lo arma con `id`, `title`, `createdAt` de la acción (más simple).
- La acción ya trae un `Task` completo (`{ type: 'added'; task: Task }`) y el reducer solo lo agrega (más limpio si después querés agregar `priority` sin tocar el reducer).

Te recomiendo la segunda. Menos repetición de campos en el tipo de acción.

**Tests que tenés que escribir (los nombres son la especificación):**

- agrega la tarea al final
- no muta el array original al agregar
- alterna `completed` solo de la tarea indicada
- ignora un id inexistente sin romper ni agregar nada
- elimina solo la tarea indicada
- `completed-cleared` elimina las completadas y conserva las pendientes
- `filter-changed` cambia el filtro sin tocar `tasks`
- **ninguna acción muta el estado original** — el test más valioso:

```ts
it('no muta el estado original', () => {
  const original = withTasks(task('a'), task('b'));
  const copia = original.tasks.map((t) => ({ ...t }));

  tasksReducer(original, { type: 'toggled', id: 'a' });
  tasksReducer(original, { type: 'removed', id: 'a' });
  tasksReducer(original, { type: 'completed-cleared' });

  expect(original.tasks).toEqual(copia);
});
```

**Verificación:**

```bash
pnpm test
pnpm test:coverage
```

Buscá 100% en `tasksReducer.ts`. Si hay una rama sin cubrir, hay un caso que no pensaste.

**Commit:** `feat(state): add pure tasks reducer with full test coverage`

---

## Fase 7 — Provider y persistencia

**Objetivo:** un solo dueño del estado, disponible en todo el árbol.

`src/state/TasksProvider.tsx`:

```tsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { initialTasksState, tasksReducer } from './tasksReducer';

const STORAGE_KEY = 'todo-app:tasks';

// ... el contexto y el provider
```

Puntos que tenés que resolver vos:

1. **Inicialización perezosa.** `useReducer(reducer, initial, init)` — el tercer argumento es el inicializador. Ahí leés `localStorage`. Si lo hacés en el cuerpo del componente, leés en cada render.
2. **`localStorage` puede no existir.** En tests con jsdom existe, pero el patrón correcto es `try/catch`. Y puede tener basura de una versión anterior del formato: validá con `Array.isArray` y chequeá que cada item tenga `id`, `title`, `completed`, `createdAt`. Un `JSON.parse` a ciegas te rompe la app entera por un dato viejo.
3. **Persistir en un `useEffect`** que dependa de `state.tasks`. No en el reducer: los efectos secundarios no van ahí.
4. **El hook que falla fuerte:**

```tsx
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks debe usarse dentro de <TasksProvider>');
  }
  return context;
};
```

Sin ese `throw`, un componente fuera del provider recibe `undefined` y explota tres niveles más abajo con un mensaje inútil. Este error te ahorra una hora de debug algún día.

5. **`useMemo` para el valor del contexto.** El contexto cambia cada vez que cambia `tasks` — eso es inevitable y correcto. `useMemo` evita re-renders si el provider re-renderiza por otra razón.

**Expone acciones, no el `dispatch`:** `addTask`, `toggleTask`, `removeTask`, `clearCompleted`, `setFilter`. El `dispatch` es un detalle de implementación; los componentes no deberían saber que existe un reducer.

**Montá el provider en `src/main.tsx`**, envolviendo `<App />`.

**Verificación** — un test, no un `console.log`:

```tsx
// src/state/TasksProvider.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TasksProvider, useTasks } from './TasksProvider';

const Consumer = () => {
  const { tasks, addTask } = useTasks();
  return (
    <>
      <span data-testid="count">{tasks.length}</span>
      <button onClick={() => addTask('Comprar pan')}>agregar</button>
    </>
  );
};

it('agrega una tarea desde un componente consumidor', async () => {
  render(
    <TasksProvider>
      <Consumer />
    </TasksProvider>,
  );

  await userEvent.click(screen.getByRole('button', { name: 'agregar' }));
  expect(screen.getByTestId('count')).toHaveTextContent('1');
});
```

**Commit:** `feat(state): add tasks provider with localStorage persistence`

---

## Fase 8 — Cablear la UI

**Objetivo:** que la app haga algo.

Vas en este orden. No saltees, porque cada paso verifica el anterior.

### 8.1 `TaskForm` — crear

```tsx
const { addTask } = useTasks();
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<TaskFormValues>({ resolver: zodResolver(taskFormSchema) });

const onSubmit: SubmitHandler<TaskFormValues> = ({ title }) => {
  addTask(title);
  reset();
};
```

Sin `reset()` el input se queda con el texto viejo después de agregar y parece que no funcionó.

Ojo: hoy también tenés `SearchBar` usando `taskFormSchema`, con `useForm` y un `onSubmit` que devuelve `data`. Un buscador no valida "al menos 5 caracteres": son cosas distintas. El buscador necesita su propio estado (o un `value` controlado), no un formulario con zod. Sepalalos en este paso.

### 8.2 `TaskList` — listar

Borrá `const task = []`. Consumí `tasks` del contexto:

```tsx
const { tasks } = useTasks();

if (tasks.length === 0) {
  return <p className="text-text-muted text-sm">No hay tareas todavía.</p>;
}

return (
  <ul>
    {tasks.map((task) => (
      <TaskItem key={task.id} task={task} />
    ))}
  </ul>
);
```

Dos reglas: `key={task.id}`, **nunca** `key={index}`. Y un `<ul>` solo puede tener `<li>` adentro — hoy le metés un `<div>` y un `<p>`.

### 8.3 `TaskItem` — completar y eliminar

Renombralo de `TaskItems` a `TaskItem`, singular: representa una tarea. Los nombres en plural para un componente de un solo item garantizan confusión.

```tsx
<input
  type="checkbox"
  className="peer sr-only"
  checked={task.completed}
  onChange={() => toggleTask(task.id)}
/>
```

`checked` + `onChange`, siempre los dos. Un checkbox con `checked` y sin `onChange` es de solo lectura y React te lo advierte. Uno con `onChange` y sin `checked` lo maneja el DOM y se desincroniza del estado.

Para el check visual sin romper el foco: `sr-only` en el input + `peer` + `peer-checked:` / `peer-focus-visible:` en el elemento visual. El input queda accesible por teclado; el `<span>` decorativo lleva `aria-hidden="true"`.

### 8.4 `Filters` — filtrar de verdad

`filtersContent.ts` hoy mezcla filtros con una acción destructiva:

```ts
{ icon: BiTrash, label: 'Eliminar', colorText: 'text-danger' }
```

"Eliminar" no es un filtro. Es una acción. Separá ambos:

```ts
export const taskFilters: { id: TaskFilter; label: string; icon: IconType }[] =
  [
    { id: 'all', label: 'Todas', icon: BiListUl },
    { id: 'active', label: 'Pendientes', icon: BiCircle },
    { id: 'completed', label: 'Completadas', icon: BiCheckCircle },
  ];
```

Y `filter` + `setFilter` salen del contexto. El botón:

```tsx
<Button
  onClick={() => setFilter(item.id)}
  aria-pressed={filter === item.id}
  className={filter === item.id ? 'text-primary' : 'text-text-muted'}
>
```

`aria-pressed` le dice a un lector de pantalla cuál está activo. Es más correcto que cambiar solo el color.

### 8.5 `Statistics` — derivar, nunca guardar

Borrá los `value={5}`, `{3}`, `{2}`:

```tsx
const { tasks } = useTasks();
const total = tasks.length;
const completed = tasks.filter((task) => task.completed).length;
const pending = total - completed;
```

**Regla de arquitectura:** nunca guardes en estado lo que podés calcular. Todo dato derivado que guardás es una fuente de verdad duplicada, y en algún momento se desincroniza. Si querés optimizar, `useMemo`; no `useState`.

### 8.6 `ConfirmDialog` — que abra y que cierre

Hoy tiene tres bugs encadenados: no tiene `ref` ni `showModal()`, no se importa en ningún lado, y sus botones son `type="button"` dentro de un `<form method="dialog">`.

Ese último es el más sutil: en un `<form method="dialog">`, **solo un botón `submit` cierra el diálogo**. Un `type="button"` es inerte. Elegí un modelo y sé consistente:

```tsx
const ref = useRef<HTMLDialogElement>(null);
```

- **Opción A — controlado:** `showModal()` / `close()` desde `useEffect` según una prop `open`. Los botones son `type="button"` con `onClick` propio, y el form es un `<div>`.
- **Opción B — nativo:** `<form method="dialog">` con botones `type="submit"` y `value="confirm"` / `"cancel"`, leyendo el `returnValue` en `onClose`.

La B es menos código y usa la plataforma. Pero si el flujo tiene que ser asíncrono (confirmar borra y espera), la A es más clara.

`showModal()` es lo que le da foco atrapado, cierre con `Escape` y backdrop gratuito. Montarlo con CSS no te da ninguna de las tres.

### 8.7 `ToggleTheme` — o funciona o se va

Hoy hay cero `dark:` en todo `src/`. El botón es una mentira.

Buena noticia: en Tailwind v4 no necesitás duplicar `dark:` en cada clase. Tus tokens de `style.css` **son variables CSS**, así que el tema es redefinir variables:

```css
@theme {
  --color-bg: #0f172a;
  /* ... */
}

[data-theme='light'] {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #0f172a;
  /* ... */
}
```

Y el toggle hace `document.documentElement.dataset.theme = theme`. Guardás la preferencia en `localStorage` y, si no hay, usás `prefers-color-scheme`. Cero cambios en los componentes.

Eso sí: ese estado de tema **no va al `TasksProvider`**. Tema y tareas son dominios distintos. O un `ThemeProvider` chico, o un `useTheme` con `useSyncExternalStore`. Y como el tema afecta el `<html>`, no el árbol de React, no puede vivir solo en un `useState` de un componente.

**Verificación de la fase** — a mano, `pnpm dev`:

- [ ] agrego una tarea → aparece en la lista
- [ ] recargo la página → la tarea sigue ahí
- [ ] marco el checkbox → se tacha y persiste al recargar
- [ ] filtro por pendientes / completadas → la lista cambia
- [ ] las estadísticas se mueven con los datos reales
- [ ] "Limpiar completadas" pide confirmación y borra
- [ ] ningún botón hace nada sin efecto

Cada punto que no funcione es un bug que encontraste vos antes que el usuario.

**Commit:** uno por sub-paso. `feat(task-form): wire form to tasks provider`, `feat(task-list): render tasks from context`, etc.

---

## Fase 9 — Markup y accesibilidad

**Objetivo:** que la app sea usable con teclado y lector de pantalla. No es un lujo: es la mitad de "funciona".

Checklist:

- [ ] `<ul>` con hijos `<li>` (`TaskList`)
- [ ] checkbox controlado con `checked` + `onChange` (`TaskItem`)
- [ ] `aria-invalid` y `aria-describedby` en el input cuando hay error
- [ ] ids únicos en inputs — hoy `htmlFor={name}` con `name="task"` duplica el id si hay dos inputs
- [ ] todo botón con solo ícono tiene nombre accesible
- [ ] `<time dateTime={...}>`
- [ ] `rel` solo cuando hay `target="_blank"`

**El fix de los ids** es importante y elegante: usá `useId()`.

```tsx
const id = useId();
const errorId = `${id}-error`;
// ...
<input
  id={id}
  aria-invalid={Boolean(error)}
  aria-describedby={error ? errorId : undefined}
/>;
{
  error && <p id={errorId}>{error.message}</p>;
}
```

`htmlFor={name}` funciona hasta que dos formularios renderizan el mismo `name`. `useId()` te da un id único por instancia, generado por React, estable entre servidor y cliente.

**El fix de los nombres accesibles:** con la Fase 1 ya tenés `...rest`, así que `aria-label` pasa solo. Pero mejor que un `aria-label` es un `<span className="sr-only">`. El `aria-label` no se traduce automáticamente y no aparece si el botón tiene texto visible. Regla: si el botón **no tiene** texto visible, `aria-label` (o `sr-only`).

**Landmarks:** hoy el único `<h1>` está adentro del `<aside>` y no hay `<main>`. Un `<aside>` es contenido complementario; el título principal de la página no va ahí. `App.tsx` debería ser:

```tsx
<>
  <Aside />
  <main>{/* panel de tareas */}</main>
</>
```

Recién ahí la página tiene estructura: banner, complementario, principal.

**Verificación:** navegá la app entera solo con `Tab` y `Enter`. Si te perdés, un usuario de teclado también. Después corré `pnpm test` con un test de `user-event` sobre el formulario.

**Commit:** `fix(a11y): associate errors with inputs and name icon buttons`

---

## Fase 10 — Tooling que te protege

**Objetivo:** que el proyecto no vuelva a romperse sin avisarte.

Esto es lo que hoy te está fallando de fondo: `pnpm lint` en verde con el build roto. Un lint que no ataja nada es peor que no tener lint, porque te da confianza falsa.

**10.1 Prettier no ordena tus clases de Tailwind.**

```json
// .prettierrc
"plugins": ["prettier-plugin-tailwindcss"],
"tailwindStylesheet": "./src/style.css"
```

Sin `tailwindStylesheet`, el plugin carga el theme **por defecto** de Tailwind. Todos tus tokens (`text-text-muted`, `bg-surface`, `border-border`, `text-danger`) los considera desconocidos y los deja donde están. Es un fallo silencioso: no rompe nada, simplemente no hace su trabajo.

**10.2 ESLint deja pasar todo.**

En `eslint.config.js`:

- `no-unused-vars` está en `warn` → volvelo a `error`. Código muerto como `BarProgress` y `dateLong` hoy pasa.
- `tailwindcss/classnames-order` y `tailwindcss/no-custom-classname` están apagadas → prendelas. Son justo las que te dicen cuándo un nombre de clase no existe.
- Agregá `eslint-plugin-jsx-a11y`:

```bash
pnpm add -D eslint-plugin-jsx-a11y
```

```js
import jsxA11y from 'eslint-plugin-jsx-a11y';
// en el array de config:
jsxA11y.flatConfigs.recommended,
```

Con eso, los errores de la Fase 9 te aparecen solos en el editor.

**10.3 El pre-commit no chequea tipos.**

`.husky/pre-commit` corre `pnpm lint-staged` (eslint + prettier). Nunca corre `tsc`. Por eso hoy hay 6 errores de compilación commiteados en `main`.

```bash
# .husky/pre-commit
pnpm typecheck
pnpm lint-staged
```

`typecheck` primero: falla rápido, sin gastar tiempo formateando archivos de un commit que igual se va a rechazar.

**10.4 CI incompleto.**

`.github/workflows/ci.yml` no corre tests (porque no hay) y no tiene permisos mínimos:

```yaml
permissions:
  contents: read

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

Y agregá el paso, después de lint:

```yaml
- name: Run tests
  run: pnpm test
```

**10.5 Dependencias mal clasificadas.**

`react-hook-form`, `@hookform/resolvers`, `zod` y `react-icons` están en `devDependencies`. Vite los bundlea, así que funciona. Pero son dependencias de runtime: cualquier `pnpm install --prod` o build de librería se rompe. Movelas a `dependencies`.

**10.6 El editor formatea distinto que el CI.**

`.vscode/settings.json:8` usa el formatter de **oxc** para `javascriptreact`, mientras el resto de los lenguajes usa Prettier, y `:21` activa `source.fixAll.oxc` al guardar. Dos motores de formato sobre el mismo árbol es la receta para un diff que cambia sin que hayas tocado nada.

Elegí uno solo: Prettier en todos los lenguajes, y `source.fixAll` apuntando a ESLint.

**Verificación:**

```bash
pnpm build && pnpm lint && pnpm test && pnpm exec prettier --check .
```

Los cuatro en verde, local, antes de pushear. Ese comando es tu nuevo "está listo".

**Commit:** `chore(tooling): enforce types, a11y and tailwind rules in lint and CI`

---

## Fase 11 — Layout, responsive y metadata

**Objetivo:** que se vea bien en un teléfono y que Google sepa qué es.

**11.1 El aside se clipea.**

```tsx
<aside className="... m-4 flex h-[calc(100dvh-2rem)] w-70 flex-col gap-4 ...">
```

Dos problemas: no hay `overflow-y-auto` en la zona scrolleable, y no hay `min-h-0`. En flexbox, un hijo con `overflow` no scrollea si no tiene `min-height: 0` — el default `min-height: auto` lo fuerza a crecer con su contenido. Es el bug de flexbox más común que existe.

```tsx
<div className="min-h-0 flex-1 overflow-y-auto">
  {/* filtros + estadísticas */}
</div>
```

El `h-[calc(100dvh-2rem)]` duplica el `m-4` (2rem = 8 × 0.25rem) como constante mágica. Si cambiás el margen, el cálculo miente. Mejor: un contenedor padre con `flex` y `h-dvh`, y el aside con `h-full`.

**11.2 No hay diseño responsive.**

Cero `sm:` / `md:` / `lg:` en todo `src/`. `w-70` son 280px fijos más `m-4`: en un viewport de 320px no entra.

```tsx
<div className="flex h-dvh flex-col md:flex-row">
  <Aside className="w-full md:w-70" />
  <main className="flex-1" />
</div>
```

Mobile: columna. Desktop: sidebar + contenido. Un solo breakpoint te cubre el 90% del caso.

**11.3 `index.html` es una plantilla sin llenar.**

- `noindex, nofollow` → un proyecto de portfolio que nunca va a aparecer en Google. Sacalo.
- `<title>todo-app</title>` → el nombre del paquete, no del producto.
- `og:image` vacío aunque `public/og-image.png` existe.
- `<link rel="icon" type="image/svg+xml" href="./favicon.png" />` → declarás SVG y el archivo es PNG.

**11.4 La fuente bloquea el render.**

`@import url('https://fonts.googleapis.com/...')` en la primera línea del CSS crítico. El navegador no pinta nada hasta resolver ese request a un tercero. Movelo a `<link rel="preconnect">` + `<link rel="stylesheet">` en el `<head>`, o auto-hosteá con `@fontsource`.

**11.5 Código muerto.**

- `Atoms/BarProgress.tsx` — no exportado, no importado, `w-0` hardcodeado. O lo conectás a las estadísticas o lo borrás.
- `utils/timeContent.ts:16` — `dateLong` es idéntico a `dateShort`, y no se usa.
- `TaskList`, `TaskForm`, `Footer`, `ConfirmDialog` no se renderizan en ningún lado.

Borrar código que no se usa no es limpieza estética: es la diferencia entre 17 componentes y 17 componentes que podés explicar.

**11.6 `README.md`**.

Está vacío. Un README de cinco líneas (qué es, cómo correrlo, qué scripts hay, dónde vive el estado) vale más que cualquier comentario en el código.

**Verificación:** `pnpm dev` y probá en 320px, 768px y 1440px. El ancho lo cambiás en DevTools, no achicando la ventana.

**Commit:** `fix(layout): make sidebar scrollable and responsive`

---

## Anexo A — Trampas específicas de este proyecto

Cosas que te van a morder y no son obvias leyendo el código:

| Trampa                               | Dónde                     | Qué hacer                                                    |
| ------------------------------------ | ------------------------- | ------------------------------------------------------------ |
| `verbatimModuleSyntax: true`         | `tsconfig.app.json:14`    | Los tipos se importan con `import type`. Si no, `tsc` falla. |
| `erasableSyntaxOnly: true`           | `tsconfig.app.json:22`    | Nada de `enum`. Usá union types.                             |
| Aliases sin wildcard                 | `tsconfig.app.json:26-31` | Agregá `"@components/*"` o los deep imports no resuelven.    |
| `tsc -b` con caché                   | `build` script            | Si ves errores fantasma: `pnpm exec tsc -b --force`.         |
| Prettier sin `tailwindStylesheet`    | `.prettierrc`             | No ordena tus tokens. Fase 10.                               |
| `no-unused-vars` en `warn`           | `eslint.config.js`        | Verde falso. Fase 10.                                        |
| `sr-only` sin `peer`                 | `TaskItems.tsx`           | Checkbox invisible e inaccesible por foco.                   |
| `min-h-0` en flex                    | `Aside.tsx`               | Sin esto, `overflow-y-auto` no scrollea.                     |
| `type="button"` en `method="dialog"` | `ConfirmDialog.tsx`       | El botón no cierra nada.                                     |

---

## Anexo B — Cómo pedir ayuda sin perder tiempo

Cuando algo falle, mandá exactamente esto:

1. **Qué fase** estabas haciendo.
2. **Qué comando** ejecutaste.
3. **La salida literal completa** del error, no tu interpretación.
4. **Qué esperabas** que pasara.

Con esos cuatro datos el diagnóstico es rápido. Sin ellos, cualquier ayuda es adivinanza.

---

## Anexo C — Orden de commits esperado

```text
fix(button): forward native button props via ComponentPropsWithoutRef
fix(components): complete public barrel exports
refactor(components): use relative intra-layer imports to break barrel cycle
chore(ts): enable strict mode in app tsconfig
feat(models): add Task domain model and fix form schema semantics
feat(state): add pure tasks reducer with full test coverage
feat(state): add tasks provider with localStorage persistence
feat(task-form): wire form to tasks provider
feat(task-list): render tasks from context
feat(filters): filter tasks by status
feat(stats): derive statistics from tasks state
feat(dialog): make confirmation dialog functional
feat(theme): implement theme switching via css variables
fix(a11y): associate errors with inputs and name icon buttons
chore(tooling): enforce types, a11y and tailwind rules in lint and CI
fix(layout): make sidebar scrollable and responsive
```

Dieciséis commits chicos y explicables. Ese es el objetivo real: un historial que se lee como un argumento.
