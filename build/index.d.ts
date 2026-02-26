import { createIntentBus, LogicActions, InferComputed, Scope, ComputedDef, LogicFactory } from 'intentx-runtime';
export { EffectMode, ExtractLogicTypes, IntentContext, LogicActions, LogicFactory, LogicRuntime, createIntentBus, createLogic, effect } from 'intentx-runtime';
import * as solid_js from 'solid-js';

type IntentBus = ReturnType<typeof createIntentBus>;
declare function getGlobalBus(): IntentBus;
declare function getScopedBus(scope?: string): IntentBus;

type LogicApi<S, C, A extends LogicActions> = {
    runtime: any;
    store: Readonly<S & InferComputed<C>>;
    state: Readonly<S & InferComputed<C>>;
    actions: A;
    emit: (...args: any[]) => Promise<void>;
};

type LogicOptions = {
    scope?: Scope | string;
    sharedBus?: boolean;
    bus?: IntentBus;
};
declare function useLogic<S extends object, C extends ComputedDef<S>, A extends LogicActions>(logic: LogicFactory<S, C, A>, options?: LogicOptions): LogicApi<S, C, A>;

declare function setLogicContext<S extends object, C extends ComputedDef<S>, A extends LogicActions>(key: string, logic: LogicFactory<S, C, A>, options?: LogicOptions): {
    Provider: (props: {
        children: any;
    }) => solid_js.JSX.Element;
    store: LogicApi<S, C, A>;
};
declare function useLogicContext<T>(key: string): T;

export { getGlobalBus, getScopedBus, setLogicContext, useLogic, useLogicContext };
export type { IntentBus, LogicApi, LogicOptions };
