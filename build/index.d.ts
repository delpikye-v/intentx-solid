import { createIntentBus, LogicActions, LogicFactory, Scope } from 'intentx-runtime';
export { EffectMode, ExtractLogicTypes, IntentContext, LogicActions, LogicFactory, LogicRuntime, createIntentBus, createLogic, effect } from 'intentx-runtime';
import * as solid_js from 'solid-js';

type IntentBus = ReturnType<typeof createIntentBus>;
declare function getGlobalBus(): IntentBus;
declare function getScopedBus(scope?: string): IntentBus;

type ComputedDef<S> = Record<string, (context: {
    state: Readonly<S>;
}) => any>;
type InferComputed<C> = {
    [K in keyof C]: C[K] extends (...args: any) => infer R ? R : never;
};
type LogicInstance<S, C, A extends LogicActions> = {
    runtime: any;
    store: Readonly<S & InferComputed<C>>;
    state: Readonly<S & InferComputed<C>>;
    actions: A;
    emit: (...args: any[]) => Promise<void>;
};

declare function useLogic<S extends object, C extends ComputedDef<S>, A extends LogicActions>(logic: LogicFactory<S, C, A>, options?: {
    scope?: Scope | string;
    sharedBus?: boolean;
    bus?: ReturnType<typeof getScopedBus>;
}): LogicInstance<S, C, A>;

declare function setLogicContext<S extends object, C extends ComputedDef<S>, A extends LogicActions>(key: string, logic: LogicFactory<S, C, A>, options?: Parameters<typeof useLogic<S, C, A>>[1]): {
    Provider: (props: {
        children: any;
    }) => solid_js.JSX.Element;
    store: LogicInstance<S, C, A>;
};
declare function useLogicContext<T>(key: string): T;

export { getGlobalBus, getScopedBus, setLogicContext, useLogic, useLogicContext };
export type { ComputedDef, InferComputed, IntentBus, LogicInstance };
