import type { BetterAuthClientPlugin } from "better-auth/client";
import type { rolePlugin } from "@/lib/plugins/server/role";

export const rolePluginClient = () => {
    return {
        id: "role",
        $InferServerPlugin: {} as ReturnType<typeof rolePlugin>,
    } satisfies BetterAuthClientPlugin;
};