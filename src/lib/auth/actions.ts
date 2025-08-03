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

export const signIn = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })
        return {
            success: true,
            message: "User signed in successfully",
        }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message || "User sign in failed",
        }
    }
}