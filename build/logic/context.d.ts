import type { LogicFactory, LogicActions, ComputedDef } from "intentx-runtime";
import type { LogicOptions } from "./useLogic";
export declare function setLogicContext<S extends object, C extends ComputedDef<S>, A extends LogicActions>(key: string, logic: LogicFactory<S, C, A>, options?: LogicOptions): {
    Provider: (props: {
        children: any;
    }) => import("solid-js").JSX.Element;
    store: import("./types").LogicApi<S, C, A>;
};
export declare function useLogicContext<T>(key: string): T;
