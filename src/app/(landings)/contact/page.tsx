import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

export default function ContactSection() {
    return (
        <section className="py-32">
            <div className="mx-auto max-w-6xl px-4 lg:px-0">
                <h1 className="mb-12 text-center text-4xl font-semibold lg:text-5xl">Help us route your inquiry</h1>

                <div className="grid divide-y border md:grid-cols-2 md:gap-4 md:divide-x md:divide-y-0">
                    <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
                        <div>
                            <h2 className="mb-3 text-lg font-semibold">Collaborate</h2>
                            <Link
                                href="mailto:hello@tranzit.cc"
                                className="text-lg text-blue-600 hover:underline dark:text-blue-400">
                                hello@tranzit.cc
                            </Link>
                            <p className="mt-3 text-sm">+243 000 000 000</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
                        <div>
                            <h3 className="mb-3 text-lg font-semibold">Press</h3>
                            <Link
                                href="mailto:press@tranzit.cc"
                                className="text-lg text-blue-600 hover:underline dark:text-blue-400">
                                press@tranzit.cc
                            </Link>
                            <p className="mt-3 text-sm">+243 000 000 000</p>
                        </div>
                    </div>
                </div>

                <div className="h-3 border-x bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"></div>
                <form
                    action=""
                    className="border px-4 py-12 lg:px-0 lg:py-24">
                    <Card className="mx-auto max-w-2xl p-8 sm:p-16">
                        <h3 className="text-xl font-semibold">Let&apos;s get you to the right place</h3>
                        <p className="mt-4 text-sm">Reach out to our sales team! We&apos;re eager to learn more about how you plan to use our application.</p>

                        <div className="mt-12 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="space-y-2">
                                        Full name
                                    </Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="email" className="space-y-2">
                                        Work Email
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="country" className="space-y-2">
                                        Country/Region
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">DR Congo</SelectItem>
                                            <SelectItem value="2">United States</SelectItem>
                                            <SelectItem value="3">France</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="website" className="space-y-2">
                                        Company Website
                                    </Label>
                                    <Input
                                        type="url"
                                        id="website"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label
                                    htmlFor="msg"
                                    className="space-y-2">
                                    Message
                                </Label>
                                <Textarea
                                    id="msg"
                                    rows={3}
                                />
                            </div>
                            <Button className="w-full">Submit</Button>
                        </div>
                    </Card>
                </form>
            </div>
        </section>
    )
}