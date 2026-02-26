import type { Scope, LogicFactory, LogicActions, ComputedDef } from "intentx-runtime";
import type { IntentBus } from "./bus";
import type { LogicApi } from "./types";
export type LogicOptions = {
    scope?: Scope | string;
    sharedBus?: boolean;
    bus?: IntentBus;
};
export declare function useLogic<S extends object, C extends ComputedDef<S>, A extends LogicActions>(logic: LogicFactory<S, C, A>, options?: LogicOptions): LogicApi<S, C, A>;
