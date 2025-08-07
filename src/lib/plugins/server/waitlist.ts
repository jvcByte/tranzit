// plugins/waitlist.ts
import { createAuthEndpoint } from "better-auth/api";
import type { BetterAuthPlugin } from "better-auth";
import z from "zod/v3";

export const waitlistPlugin = () => {
    return {
        id: "waitlist",
        schema: {
            waitlist: {
                fields: {
                    name: {
                        type: "string",
                        required: true
                    },
                    email: {
                        type: "string",
                        required: true,
                        unique: true
                    },
                    status: {
                        type: "string" // pending, approved, rejected
                    },
                    createdAt: {
                        type: "date"
                    }
                }
            }
        },
        endpoints: {
            joinWaitlist: createAuthEndpoint("/waitlist/join-waitlist", {
                method: "POST",
                body: z.object({
                    name: z.string().min(3, {
                        message: "Name must be at least 3 characters.",
                    }),
                    email: z.string().email({
                        message: "Please enter a valid email address.",
                    }),
                })
            }, async (ctx) => {
                const body = ctx.body as { name: string; email: string };

                if (!body?.name || !body?.email) {
                    return ctx.json({
                        error: "Name and email are required"
                    }, { status: 400 });
                }

                const { name, email } = body;

                try {
                    // Check if email already exists
                    const existing = await ctx.context.adapter.findOne({
                        model: "waitlist",
                        where: [
                            {
                                field: "email",
                                operator: "eq",
                                value: email
                            }
                        ]
                    });

                    if (existing) {
                        return ctx.json({
                            error: "Email already registered for waitlist"
                        }, { status: 400 });
                    }

                    // Add to waitlist
                    const waitlistEntry = await ctx.context.adapter.create({
                        model: "waitlist",
                        data: {
                            name,
                            email,
                            status: "pending",
                            createdAt: new Date()
                        }
                    });

                    return ctx.json({
                        message: "Successfully joined waitlist!",
                        data: waitlistEntry
                    });
                } catch (err) {
                    console.error("Waitlist join error:", err);
                    return ctx.json({
                        error: "Failed to join waitlist"
                    }, { status: 500 });
                }
            }),

            getWaitlistStats: createAuthEndpoint("/waitlist/stats", {
                method: "GET"
            }, async (ctx) => {
                try {
                    // Use adapter instead of db for consistency
                    const allEntries = await ctx.context.adapter.findMany({
                        model: "waitlist"
                    }) as Array<{ status: string }>;

                    const total = allEntries.length;
                    const pending = allEntries.filter((entry: { status: string }) => entry.status === "pending").length;

                    return ctx.json({
                        total,
                        pending
                    });
                } catch (err) {
                    console.error("Waitlist stats error:", err);
                    return ctx.json({
                        error: "Failed to get stats"
                    }, { status: 500 });
                }
            })
        }
    } satisfies BetterAuthPlugin;
};