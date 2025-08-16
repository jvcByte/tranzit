"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { z } from 'zod/v3'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { authClient } from '@/lib/auth/auth-client'
import { Input } from '../ui/input'

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

export default function JoinWaitlist() {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {

            const response = await authClient.waitlist.joinWaitlist({
                name: values.name,
                email: values.email
            });
            if (response.data) {
                toast.success('🎉 You have been added to the waitlist! 🎉', {
                    description: 'Stay tuned for updates.',
                })
            } else {
                toast.error('Failed to join waitlist. Please try again.', {
                    description: 'An unknown error occurred',
                })
            }

            // Reset form
            form.reset()
        } catch (error) {
            console.error('Error joining waitlist:', error)
            toast.error('Failed to join waitlist. Please try again.', {
                description: error instanceof Error ? error.message : 'An unknown error occurred',
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <section className="relative py-16 mx-4">
            <div className="bg-[#e0f4c3]/75 relative mx-auto md:max-w-7xl max-w-10px overflow-hidden rounded-3xl border px-6 py-12 md:py-20 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-black/5">
                    <div className="relative h-full w-full">
                        <Image
                            src="/hero-section-bg.svg"
                            alt=""
                            fill
                            className="object-cover opacity-40 scale-99"
                            priority
                            quality={100}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <h2 className="text-balance text-[#181517] text-2xl font-bold lg:text-5xl">We&apos;re almost ready to launch and you can be first in line.</h2>
                    <p className="mt-6 text-lg md:text-2xl text-[#181517] leading-[1.6] max-w-4xl font-base ">Join the waitlist and be the first to know when Tranzit Mobility goes live in your city. Early access means priority booking, exclusive offers, and insider updates.</p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-center md:gap-6 gap-2  m-6 space-y-6">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Name"
                                                        className="h-12 md:h-16 md:w-120 px-4 text-lg rounded-md border-2 border-gray-800 placeholder:text-gray-800 placeholder:font-normal placeholder:text-base"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className=" space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Email"
                                                        className="h-12 md:h-16 md:w-120 px-4 text-lg rounded-md border-2 border-gray-800 placeholder:text-gray-800 placeholder:font-normal placeholder:text-base"
                                                            {...field}
                                                    />
                                                </FormControl>  
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <Button
                                type='submit'
                                disabled={isLoading}
                                size="lg"
                                className="gap-1 bg-[#fec104] text-white p-4 md:p-7 md:text-lg cursor-pointer">
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        <span>Adding you to the waitlist...</span>
                                    </div>
                                ) : (
                                        <span>Join the Waitlist</span>
                                    )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}