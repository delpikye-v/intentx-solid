import type { LogicFactory, LogicActions } from "intentx-runtime";
import { useLogic } from "./useLogic";
import type { ComputedDef } from "./types";
export declare function setLogicContext<S extends object, C extends ComputedDef<S>, A extends LogicActions>(key: string, logic: LogicFactory<S, C, A>, options?: Parameters<typeof useLogic<S, C, A>>[1]): {
    Provider: (props: {
        children: any;
    }) => import("solid-js").JSX.Element;
    store: import("./types").LogicInstance<S, C, A>;
};
export declare function useLogicContext<T>(key: string): T;
