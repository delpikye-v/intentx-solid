import type { LogicActions } from "intentx-runtime";
export type ComputedDef<S> = Record<string, (context: {
    state: Readonly<S>;
}) => any>;
export type InferComputed<C> = {
    [K in keyof C]: C[K] extends (...args: any) => infer R ? R : never;
};
export type LogicInstance<S, C, A extends LogicActions> = {
    runtime: any;
    store: Readonly<S & InferComputed<C>>;
    state: Readonly<S & InferComputed<C>>;
    actions: A;
    emit: (...args: any[]) => Promise<void>;
};
