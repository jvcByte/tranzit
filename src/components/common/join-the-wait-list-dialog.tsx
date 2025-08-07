"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod/v3"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChevronRight, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { authClient } from "@/lib/auth/auth-client"

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

export function JoinTheWaitlistDialog() {
    const [isOpen, setIsOpen] = useState(false)
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

            // Close the dialog
            setIsOpen(false)

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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button type="button" size="lg" className="h-12 rounded-full pl-5 pr-3 text-base">
                    Join the waitlist
                    <ChevronRight className="ml-1" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>Join the waitlist</DialogTitle>
                            <DialogDescription>
                                Be the first to know when we launch. Join our waitlist now.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Albert Marcelo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="albert@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                {isLoading ?
                                    (<Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        "Join the waitlist"
                                    )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
