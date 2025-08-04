"use server";

import { auth } from "@/lib/auth";

export const signUp = async (email: string, password: string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: "John Doe",
            }
        })
        return {
            success: true,
            message: "User signed up successfully",
        }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message || "User sign up failed",
        }
    }
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