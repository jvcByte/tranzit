import type { BetterAuthClientPlugin } from "better-auth/client";
import type { waitlistPlugin } from "@/lib/plugins/server/waitlist";

export const waitlistPluginClient = () => {
    return {
        id: "waitlist",
        $InferServerPlugin: {} as ReturnType<typeof waitlistPlugin>,
        pathMethods: {
            "/waitlist/join-waitlist": "POST"
        },
    } satisfies BetterAuthClientPlugin;
};