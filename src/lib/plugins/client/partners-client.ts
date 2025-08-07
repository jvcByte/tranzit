import type { BetterAuthClientPlugin } from "better-auth/client";
import type { partnersPlugin } from "@/lib/plugins/server/partners";

export const partnersPluginClient = () => {
    return {
        id: "partners",
        $InferServerPlugin: {} as ReturnType<typeof partnersPlugin>,
    } satisfies BetterAuthClientPlugin;
};