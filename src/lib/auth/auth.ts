// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";
import { partnersPlugin } from "@/lib/plugins/server/partners";
import { waitlistPlugin } from "@/lib/plugins/server/waitlist"; 
import { rolePlugin } from "@/lib/plugins/server/role";
export const auth = betterAuth({
  trustedOrigins: [
    'http://localhost:3000',
    'http://192.168.80.202:3000',
  ],

  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 60 * 60 * 24 // 5 days cache
    }
  },

  plugins: [
    partnersPlugin(),
    waitlistPlugin(),
    rolePlugin(),
    nextCookies()]
})