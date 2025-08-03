"use server";

import { auth } from "@/lib/auth";

export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            email: "jvc@email.com",
            password: "password",
            name    : "John Doe",
        }
    })
}

export const signIn = async () => {
    await auth.api.signInEmail({
        body: {
            email: "jvc@email.com",
            password: "password",
        }
    })
}