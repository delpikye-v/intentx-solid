## 🔷⚡ intentx-solid

[![NPM](https://img.shields.io/npm/v/intentx-solid.svg)](https://www.npmjs.com/package/intentx-solid) ![Downloads](https://img.shields.io/npm/dt/intentx-solid.svg)

<a href="https://codesandbox.io/p/devbox/5d4shj" target="_blank">LIVE EXAMPLE</a>

---

`intentx-solid` enforces a strict architectural boundary between deterministic business logic and reactive UI in Solid.

It enforces a strict separation between:
- Business Logic (deterministic runtime)
- UI Rendering (fine-grained reactivity)

> It is a bridge between deterministic logic and Solid’s reactive UI.

---

## ✨ Why intentx-solid?

Use it when your UI starts to feel like business logic.

✅ Complex async workflows  
✅ Intent-based architecture  
✅ Microfrontend communication  
✅ Testable business logic  
✅ Cross-framework runtime reuse  

Avoid it when:

❌ This library introduces an architectural boundary.  
❌ If you don’t need architectural boundaries, don’t use it.  

---

## 🧠  Mental Model

```txt
UI / HTTP / Queue / Cron
        ↓
  intentx-runtime
        ↓
Fine-grained reactivity updates UI
```

Core principle:

> Intent is the only mutation entry point.
> The [runtime](https://www.npmjs.com/package/intentx-runtime) owns behavior. UI only triggers intent.

---

## 📦 Installation

``` bash
npm install intentx-solid
```

---

## 🧩 Core Logic (Framework-Agnostic)

Even though this is the React package, the runtime is fully usable without React.

``` ts
import { createLogic } from "intentx-solid"

export const counterLogic = createLogic({
  name: "counter",

  state: {
    count: 0
  },

  computed: {
    double: ({ state }) => state.count * 2
  },

  intents: (bus) => {
    bus.on("inc", ({ setState }) => {
      setState((s) => {
        s.count++;
      });
    });
  },

  actions: {
    inc({ emit }) {
      return () => emit("inc");
    },
  },
})
```

---

## 🚀 Usage

``` tsx
import { useLogic } from "intentx-solid"
import { counterLogic } from "./counter.logic"

export default function Counter() {
  const counter = useLogic(counterLogic)
  // const { actions, emit, store } = useLogic(counterLogic)

  return (
    <>
      <button onClick={counter.actions.inc}>
        {counter.state.count}
      </button>

      <button onClick={() => emit("inc")}>
        {counter.state.count}
      </button>

      <p>Double: {counter.store.double}</p>
    </>
  )
}
```

No wrapper components.
No providers required (unless you want shared context).

---

## 📦 What `useLogic` Returns

``` ts
const counter = useLogic(counterLogic)
```

```ts
  {
    store, //
    state, // alias state
    actions, // actions -> emit
    emit // directly
  }
```

🔥 Important

- store is readonly

- Mutations must go through actions

- Solid reactivity remains fine-grained

---

## 📡  Multiple Logic Communication (Bus)

Each `logic` instance is isolated by default.

To enable communication between runtimes, you can share an Intent Bus.

---

### 1️⃣ Scoped Shared Bus (Recommended)

```ts
import { useLogic } from "intentx-solid"

// ✅ Same scope → shared bus
useLogic(logic, {
  scope: "dashboard",
  sharedBus: true
})

// ❌ Different scope → different bus
useLogic(logic, {
  scope: "settings",
  sharedBus: true
})
```

<b>How it works</b>

When sharedBus: true is enabled:

- A singleton bus is created per scope

- Same scope → same bus instance

- Different scope → different bus

- No global leakage

If no `scope` is provided:

```ts
useLogic(logic, {
  sharedBus: true
})
```

→ uses a default global scope bus.

---

### 2️⃣ Custom Bus (Advanced / Cross-Scope)

```ts
import { createIntentBus } from "intentx-react"

const bus = createIntentBus()

useLogic(logicA, { bus })
useLogic(logicB, { bus })

```

<b>Behavior</b>

- Full cross-scope communication
- Manual orchestration control
- Suitable for:
  - Microfrontend
  - App-wide coordination
  - Complex workflow systems

### 🔍 Behavior Comparison

| Mode                 | Isolation    | Scope-aware | Cross-scope  | Recommended           |
| -------------------- | -----------  | ----------- | ------------ | --------------------- |
| Default (no options) | ✅ Full      | ❌           | ❌           | Small/local logic     |
| `sharedBus: true`    | ❌ Per scope | ✅           | ❌           | Modular apps          |
| Custom `bus`         | ❌ Manual    | ❌           | ✅           | Advanced architecture |

### 🎯 Recommendation

✅ Use sharedBus for modular communication.  
✅ Use custom bus for orchestration layer.  
🚫 Avoid global single bus without scope in large apps.  

---

## 🧩 Context API

Provide logic via Solid context:

``` ts
import { setLogicContext, useLogicContext } from "intentx-solid"
import { counterLogic } from "./counter.logic"
```

Provider:

``` tsx
const { Provider } = setLogicContext(
  "counter",
  counterLogic
)

export default function App() {
  return (
    <Provider>
      <Child />
    </Provider>
  )
}
```

Consume:

``` ts
const counter = useLogicContext("counter")
```

---

## 🌍 SSR

- Runtime created during SSR
- Deterministic snapshot
- Hydration-safe
- No client-only hacks
- Server snapshot serializable
- Client rehydrates from deterministic state

Works with:

- SolidStart
- Node SSR
- Edge runtimes

---

## 🧪 Testability Upgrade

Without rendering anything:

```ts
const runtime = counterLogic.create()

runtime.actions.inc()
expect(runtime.state.count).toBe(1)

```

That is the real split.

---

## 🔍 Comparison


| Criteria                | Solid primitives | intentx-solid |
| ----------------------- | ---------------- | ------------- |
| Local UI                | Excellent        | Overkill      |
| Async orchestration     | Manual           | Structured    |
| Cross-environment reuse | No               | Yes           |
| Deterministic runtime   | No               | Yes           |


- UI consumes state.
- Logic lives outside components.

---

## 🔥 What This Library Actually Does

<b>It separates business logic from UI completely.</b>

Without this split:

- Components start holding async workflows
- Event chains become implicit
- State transitions become coupled to rendering
- Testing requires rendering components

With intentx-solid:

- Logic lives outside the component tree
- UI becomes a pure consumer
- Async workflows are deterministic
- Runtime can be reused in Node, SSR, microfrontends

---

## 🧩 Architectural Boundary

<b>Solid owns:</b>

- Signals
- Reactivity
- DOM updates
- Rendering lifecycle

<b>intentx owns:</b>

- State machine
- Intent routing
- Async orchestration
- Computed graph
- Cross-runtime communication

This is not about replacing `createSignal`.

It is about preventing this:

```ts
// ❌ Business logic leaking into UI
createEffect(async () => {
  if (userId()) {
    const data = await fetchUser(userId())
    setUser(data)
  }
})
```
And moving it here:

```ts
// ✅ Logic outside UI
intents: (bus) => {
  bus.on("loadUser", async ({ setState }) => {
    const data = await fetchUser(id)
    setState(d => {
      d.user = data
    })
  });
}
```

Now UI only emits intent.

---

## 🎯 Philosophy

Rendering is reactive.

Business logic should be deterministic.

intentx-solid ensures they never mix.

---

## ❌ What This Is Not

- Not a signal replacement
- Not a store wrapper
- Not a UI state helper
- Not a reducer abstraction

---

## 📜 License

MIT
