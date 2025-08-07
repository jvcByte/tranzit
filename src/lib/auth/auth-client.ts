import { createAuthClient } from "better-auth/react";
import { partnersPluginClient } from "@/lib/plugins/client/partners-client";
import { waitlistPluginClient } from "@/lib/plugins/client/waitlist-client";

export const authClient = createAuthClient({
    baseURL: process.env.BASE_URL === "development" ? process.env.DEVELOPMENT_BASE_URL : process.env.PRODUCTION_BASE_URL,

    plugins: [
        partnersPluginClient(),
        waitlistPluginClient()
    ]
    
});