import { betterAuth } from "better-auth";
import { Pool } from "pg";
 
export const auth = betterAuth({
    database: new Pool({
        user: "postgres",
        host: "localhost",
        database: "postgres",
        password: "postgres",
        port: 5432,
    }),
})