import type { Scope, LogicFactory, LogicActions } from "intentx-runtime";
import { getScopedBus } from "./bus";
import type { ComputedDef, LogicInstance } from "./types";
export declare function useLogic<S extends object, C extends ComputedDef<S>, A extends LogicActions>(logic: LogicFactory<S, C, A>, options?: {
    scope?: Scope | string;
    sharedBus?: boolean;
    bus?: ReturnType<typeof getScopedBus>;
}): LogicInstance<S, C, A>;
