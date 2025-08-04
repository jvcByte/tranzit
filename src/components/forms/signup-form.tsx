"use client"

// import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { signUp } from '@/lib/auth/actions'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export default function SignupPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const signUpWithGoogle = async () => {
        setIsGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google"
            });
            toast.success('Redirecting to Google...', {
                className: "toast-success",
                duration: 3000,
            });
        } catch (error) {
            console.error('Google sign in error:', error);
            toast.error('Failed to sign in with Google', {
                className: "toast-error",
                duration: 4000,
            });
        } finally {
            setIsGoogleLoading(false);
        }
    }

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        const { success, message } = await signUp(values.email, values.password)
        if (success) {
            toast.success(message as string, {
                className: "toast-success",
                duration: 4000,
            })
            router.push("/dashboard")
        } else {
            toast.error(message as string, {
                className: "toast-error",
                duration: 4000,
            })
        }

        setIsLoading(false)
    }
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                    <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                        <div className="text-center">
                            <Link
                                href="/"
                                aria-label="go home"
                                className="mx-auto block w-fit">
                                {/* <LogoIcon /> */}
                            </Link>
                            <h1 className="mb-1 mt-4 text-xl font-semibold">Sign Up to Tranzit</h1>
                            <p className="text-sm">Welcome! Sign up to continue</p>
                        </div>

                        <div className="mt-6 space-y-6">
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="email@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="*********"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <div className="flex justify-end mt-2">
                                                <Button
                                                    asChild
                                                    variant="link"
                                                    size="sm"
                                                    className="p-0 h-auto -mt-1"
                                                >
                                                    <Link
                                                        href="/login"
                                                        className="text-sm text-muted-foreground hover:text-primary"
                                                    >
                                                        Already have an account?
                                                    </Link>
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ?
                                    (<Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        "Sign Up"
                                    )}
                            </Button>
                        </div>

                        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                            <hr className="border-dashed" />
                            <span className="text-muted-foreground text-xs">Or continue With</span>
                            <hr className="border-dashed" />
                        </div>

                        <div className="mt-4 space-y-6">
                            <Button
                                type="button"
                                onClick={signUpWithGoogle}
                                className='w-full flex items-center justify-center gap-2'
                                variant="outline"
                                disabled={isGoogleLoading || isLoading}
                            >
                                {isGoogleLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="0.98em"
                                            height="1em"
                                            viewBox="0 0 256 262"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                fill="#4285f4"
                                                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                            />
                                            <path
                                                fill="#34a853"
                                                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                            />
                                            <path
                                                fill="#fbbc05"
                                                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                                            />
                                            <path
                                                fill="#eb4335"
                                                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                            />
                                        </svg>
                                        <span>Continue with Google</span>
                                    </>
                                )}
                            </Button>
                        </div>


                    </div>

                    <div className="p-3">
                        <p className="text-accent-foreground text-center text-sm">
                            Don&apos;t have an account ?
                            <Button
                                asChild
                                variant="link"
                                className="px-2">
                                <Link href="/signup">Create account</Link>
                            </Button>
                        </p>
                    </div>
                </form>
            </Form>
        </section>
    )
}