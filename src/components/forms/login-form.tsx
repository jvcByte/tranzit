"use client"

// import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { signIn } from '@/lib/auth/actions'
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

export default function LoginPage() {

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const signInWithGoogle = async () => {
        await authClient.signIn.social({
            provider: "google"
        })
    }

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        const { success, message } = await signIn(values.email, values.password)
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
                            <h1 className="mb-1 mt-4 text-xl font-semibold">Sign In to Tranzit</h1>
                            <p className="text-sm">Welcome back! Sign in to continue</p>
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
                                                        href="/forgot-password"
                                                        className="text-sm text-muted-foreground hover:text-primary"
                                                    >
                                                        Forgot your Password?
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
                                        "Sign In"
                                    )}
                            </Button>
                        </div>

                        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                            <hr className="border-dashed" />
                            <span className="text-muted-foreground text-xs">Or continue With</span>
                            <hr className="border-dashed" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                onClick={signInWithGoogle}
                                variant="outline">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="0.98em"
                                    height="1em"
                                    viewBox="0 0 256 262">
                                    <path
                                        fill="#4285f4"
                                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                    <path
                                        fill="#34a853"
                                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                    <path
                                        fill="#fbbc05"
                                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                    <path
                                        fill="#eb4335"
                                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                                </svg>
                                <span>Google</span>
                            </Button>
                            <Button
                                type="button"
                                variant="outline">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 256 256">
                                    <path
                                        fill="#f1511b"
                                        d="M121.666 121.666H0V0h121.666z"></path>
                                    <path
                                        fill="#80cc28"
                                        d="M256 121.666H134.335V0H256z"></path>
                                    <path
                                        fill="#00adef"
                                        d="M121.663 256.002H0V134.336h121.663z"></path>
                                    <path
                                        fill="#fbbc09"
                                        d="M256 256.002H134.335V134.336H256z"></path>
                                </svg>
                                <span>Microsoft</span>
                            </Button>
                        </div>
                        <div className="mt-4 space-y-6">
                            <Button
                                type="button"
                                className='w-full'
                                variant="outline">
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <title>Apple</title>
                                    <path
                                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                                </svg>
                                <span>Apple</span>
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