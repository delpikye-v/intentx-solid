import { createIntentBus } from "intentx-runtime";
export type IntentBus = ReturnType<typeof createIntentBus>;
export declare function getGlobalBus(): IntentBus;
export declare function getScopedBus(scope?: string): IntentBus;
