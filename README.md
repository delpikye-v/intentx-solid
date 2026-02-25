## 🔷⚡ intentx-solid

[![NPM](https://img.shields.io/npm/v/intentx-solid.svg)](https://www.npmjs.com/package/intentx-solid) ![Downloads](https://img.shields.io/npm/dt/intentx-solid.svg)

<a href="https://codesandbox.io/p/devbox/5d4shj" target="_blank">LIVE EXAMPLE</a>

---

`intentx-solid` is an architectural layer for Solid.
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

❌ You only need simple `createSignal`  
❌ You want reducer-style state  
❌ Your state is purely local UI  

---

## 🧠 Mental Model
```txt
    UI Event
       ↓
    emit(intent)
       ↓
    intent handler
       ↓
    setState
       ↓
    computed re-evaluates
       ↓
    Solid store updates
       ↓
    Fine-grained reactivity updates UI
```

---

## 📦 Installation

``` bash
npm install intentx-solid
```

---

## 🧩 Core Logic (Framework-Agnostic)

``` ts
import { createLogic } from "intentx-runtime"

export const counterLogic = createLogic({
  name: "counter",

  state: {
    count: 0
  },

  computed: {
    double: ({ state }) => state.count * 2
  },

  actions: ({ setState }) => ({
    inc() {
      setState(d => {
        d.count++
      })
    }
  })
})
```

---

## 🔌 Solid Adapter

``` ts
export { useLogic }
```

---

## 🚀 Usage

``` tsx
import { useLogic } from "intentx-solid"
import { counterLogic } from "./counter.logic"

export default function Counter() {
  const counter = useLogic(counterLogic)

  return (
    <>
      <button onClick={counter.actions.inc}>
        {counter.store.count}
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

```txt
    {
      runtime,
      store,
      state,
      actions,
      emit
    }
```

🔥 Important

- store is readonly

- Mutations must go through actions

- Solid reactivity remains fine-grained

---

## 📡 Scoped Bus

``` ts
useLogic(logic, {
  sharedBus: true
})
```

Scoped:

``` ts
useLogic(logic, {
  scope: "dashboard",
  sharedBus: true
})
```

Custom bus:

``` ts
import { createIntentBus } from "intentx-runtime"

const bus = createIntentBus()

useLogic(logic, {
  bus
})
```

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

| Criteria               | Solid only  | intentx-solid |
| ---------------------- | ----------- | ------------- |
| Local UI state         | ✅          | ❌ Overkill    |
| Async orchestration    | ⚠️ Manual   | ✅ Built-in    |
| Cross-runtime reuse    | ❌          | ✅             |
| Deterministic snapshot | ❌          | ✅             |



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
actions: ({ setState }) => ({
  async loadUser(id: string) {
    const data = await fetchUser(id)
    setState(d => {
      d.user = data
    })
  }
})
```

Now UI only emits intent.

---

## 🎯 Philosophy

Rendering is reactive.

Business logic should be deterministic.

intentx-solid ensures they never mix.

---

## 📜 License

MIT
