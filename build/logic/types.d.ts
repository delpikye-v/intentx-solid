import type { InferComputed, LogicActions } from "intentx-runtime";
export type LogicApi<S, C, A extends LogicActions> = {
    runtime: any;
    store: Readonly<S & InferComputed<C>>;
    state: Readonly<S & InferComputed<C>>;
    actions: A;
    emit: (...args: any[]) => Promise<void>;
};
