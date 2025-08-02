import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings2, Sparkles, Zap } from 'lucide-react'
import { ReactNode } from 'react'
import { BorderTrail } from '@/components/motion-primitives/border-trail'

export default function Features() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Designed to cover your needs</h2>
                    <p className="mt-4">Ready to transform how you move through your city? Join the movement that&apos;s redefining urban transport across Africa. With Tranzit, every ride is a step toward a smarter, safer, and more connected tomorrow.</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
                    
                    <Card className="group shadow-zinc-950/5 relative">
                        <BorderTrail
                            className="pointer-events-none absolute inset-0"
                            style={{
                                boxShadow: '0px 0px 280px 200px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
                                // Optionally: width: '100%', height: '100%',
                            }}
                            size={100}
                        />
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Zap
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Accessibility First</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm"> <strong>Mobility for Everyone</strong> Designed to be inclusive, affordable, and accessible to all young urban commuters, regardless of their background or budget.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5 relative">
                        <BorderTrail
                            className="pointer-events-none absolute inset-0"
                            style={{
                                boxShadow: '0px 0px 280px 200px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
                                // Optionally: width: '100%', height: '100%',
                            }}
                            size={100}
                        />
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Settings2
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Youth-Centered Design</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm"> <strong>Built by Young People, for Young People</strong> From intuitive app design to payment options that work for you at your convinience.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5 relative">
                        <BorderTrail
                            className="pointer-events-none absolute inset-0"
                            style={{
                                boxShadow: '0px 0px 280px 200px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
                                // Optionally: width: '100%', height: '100%',
                            }}
                            size={100}
                        />
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Sparkles
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Smart Innovation</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm"> <strong>Tech That Actually Works</strong> Powered by cutting-edge technology that makes booking, tracking, and paying for rides effortless</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5 relative">
                        <BorderTrail
                            className="pointer-events-none absolute inset-0"
                            style={{
                                boxShadow: '0px 0px 280px 200px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
                                // Optionally: width: '100%', height: '100%',
                            }}
                            size={100}
                        />
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Sparkles
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Community Over Competition</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm"> <strong>More Than Just a Ride</strong> Join a community of forward-thinking riders and drivers working together to create positive change.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5 relative">
                        <BorderTrail
                            className="pointer-events-none absolute inset-0"
                            style={{
                                boxShadow: '0px 0px 280px 200px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
                                // Optionally: width: '100%', height: '100%',
                            }}
                            size={100}
                        />
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Sparkles
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Safety & Trust</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm"> <strong>Your Security is Our Priority</strong> Advanced safety features, verified drivers, real-time tracking, and 24/7 support ensure every journey is secure. Because trust isn&apos;t just earned—it&apos;s built into every ride.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5 relative">
                        <BorderTrail
                            className="pointer-events-none absolute inset-0"
                            style={{
                                boxShadow: '0px 0px 280px 200px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
                                // Optionally: width: '100%', height: '100%',
                            }}
                            size={100}
                        />
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Sparkles
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Affordable Excellence</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm"> <strong>Premium Experience, Fair Prices</strong> Quality mobility shouldn&apos;t break the bank. Transparent pricing and flexible payment options make reliable transportation accessible to you.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div
            aria-hidden
            className="bg-radial to-background absolute inset-0 from-transparent to-75%"
        />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)