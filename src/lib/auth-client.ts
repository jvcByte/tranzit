import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.BASE_URL === "development" ? process.env.DEVELOPMENT_BASE_URL : process.env.PRODUCTION_BASE_URL,
    
});