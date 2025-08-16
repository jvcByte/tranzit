// plugins/partners.ts
import { createAuthEndpoint, sessionMiddleware } from "better-auth/api";
import type { BetterAuthPlugin } from "better-auth";
import z from "zod/v3";

function generateReferralCode(): string {
    return Math.random().toString(36).substring(2, 12).toUpperCase();
}

export const partnersPlugin = () => {
    return {
        id: "partners",
        schema: {
            partners: {
                fields: {
                    userId: {
                        type: "string",
                        required: true,
                        unique: true,
                        references: {
                            model: "user",
                            field: "id",
                            onDelete: "cascade"
                        }
                    },
                    referralCode: {
                        type: "string",
                        required: true,
                        unique: true
                    },
                    totalEarnings: {
                        type: "number"
                    },
                    type: {
                        type: "string" // 'partner' or 'affiliate'
                    },
                    status: {
                        type: "string" // 'active', 'inactive', 'pending'
                    },
                    createdAt: {
                        type: "date"
                    }
                }
            },
            referrals: {
                fields: {
                    partnerId: {
                        type: "string",
                        required: true,
                        references: {
                            model: "partners",
                            field: "id",
                            onDelete: "cascade"
                        }
                    },
                    referredUserId: {
                        type: "string",
                        references: {
                            model: "user",
                            field: "id",
                            onDelete: "cascade"
                        }
                    },
                    referralCode: {
                        type: "string",
                        required: true
                    },
                    commission: {
                        type: "number"
                    },
                    status: {
                        type: "string" // 'pending', 'approved', 'paid'
                    },
                    createdAt: {
                        type: "date"
                    }
                }
            }
        },
        endpoints: {
            // Join as partner/affiliate
            joinProgram: createAuthEndpoint("/partners/join", {
                method: "POST",
                use: [sessionMiddleware]
            }, async (ctx) => {
                const session = ctx.context.session;
                if (!session) {
                    return ctx.json({ error: "Not authenticated" }, { status: 401 });
                }

                const body = await ctx.body() as { type: string };

                if (!body?.type) {
                    return ctx.json({
                        error: "Type is required (partner or affiliate)"
                    }, { status: 400 });
                }

                const { type } = body;

                try {
                    // Check if user is already a partner/affiliate
                    const existing = await ctx.context.adapter.findOne({
                        model: "partners",
                        where: [
                            {
                                field: "userId",
                                operator: "eq",
                                value: session.user.id
                            }
                        ]
                    });

                    if (existing) {
                        return ctx.json({
                            error: "User is already enrolled in the program"
                        }, { status: 400 });
                    }

                    // Generate unique referral code
                    let referralCode: string;
                    let isUnique = false;

                    while (!isUnique) {
                        referralCode = generateReferralCode();
                        const existingCode = await ctx.context.adapter.findOne({
                            model: "partners",
                            where: [
                                {
                                    field: "referralCode",
                                    operator: "eq",
                                    value: referralCode
                                }
                            ]
                        });
                        if (!existingCode) {
                            isUnique = true;
                        }
                    }

                    const partner = await ctx.context.adapter.create({
                        model: "partners",
                        data: {
                            userId: session.user.id,
                            referralCode: referralCode!,
                            totalEarnings: 0,
                            type: type || 'affiliate',
                            status: 'active',
                            createdAt: new Date()
                        }
                    });

                    return ctx.json({
                        message: `Successfully joined as ${type || 'affiliate'}!`,
                        data: partner
                    });
                } catch (err) {
                    console.error("Join program error:", err);
                    return ctx.json({
                        error: "Failed to join program"
                    }, { status: 500 });
                }
            }),

            // Get partner dashboard data
            getDashboard: createAuthEndpoint("/partners/dashboard", {
                method: "GET",
                use: [sessionMiddleware]
            }, async (ctx) => {
                const session = ctx.context.session;
                if (!session) {
                    return ctx.json({ error: "Not authenticated" }, { status: 401 });
                }

                try {
                    // Get partner info
                    const partner = await ctx.context.adapter.findOne({
                        model: "partners",
                        where: [
                            {
                                field: "userId",
                                operator: "eq",
                                value: session.user.id
                            }
                        ]
                    }) as { id: string; totalEarnings: number } | null;

                    if (!partner) {
                        return ctx.json({
                            error: "User is not enrolled in the program"
                        }, { status: 404 });
                    }

                    // Get referrals
                    const referrals = await ctx.context.adapter.findMany({
                        model: "referrals",
                        where: [
                            {
                                field: "partnerId",
                                operator: "eq",
                                value: partner.id
                            }
                        ]
                    }) as Array<{ status: string; commission: number }>;

                    // Calculate earnings stats
                    const totalReferrals = referrals.length;
                    const pendingEarnings = referrals
                        .filter((r: { status: string }) => r.status === 'pending')
                        .reduce((sum, r: { commission: number }) => sum + (r.commission || 0), 0);
                    const paidEarnings = referrals
                        .filter((r: { status: string }) => r.status === 'paid')
                        .reduce((sum, r: { commission: number }) => sum + (r.commission || 0), 0);

                    return ctx.json({
                        partner,
                        referrals,
                        stats: {
                            totalReferrals,
                            totalEarnings: partner.totalEarnings,
                            pendingEarnings,
                            paidEarnings
                        }
                    });
                } catch (err) {
                    console.error("Dashboard error:", err);
                    return ctx.json({
                        error: "Failed to get dashboard data"
                    }, { status: 500 });
                }
            }),

            // Track referral (called when someone signs up with referral code)
            trackReferral: createAuthEndpoint("/partners/track-referral", {
                method: "POST",
                body: z.object({
                    referralCode: z.string({
                        required_error: "Referral code is required"
                    }),
                    referredUserId: z.string({
                        required_error: "Referred user ID is required"
                    }),
                    commission: z.string({
                        required_error: "Commission is required"
                    })
                })
            }, async (ctx) => {
                const {
                    referralCode,
                    referredUserId,
                    commission
                } = ctx.body;

                if (!referralCode || !referredUserId) {
                    return ctx.json({
                        error: "Referral code and referred user ID are required"
                    }, { status: 400 });
                }

                try {
                    // Find partner by referral code
                    const partner = await ctx.context.adapter.findOne({
                        model: "partners",
                        where: [
                            {
                                field: "referralCode",
                                operator: "eq",
                                value: referralCode
                            }
                        ]
                    }) as { id: string; totalEarnings: number } | null;

                    if (!partner) {
                        return ctx.json({
                            error: "Invalid referral code"
                        }, { status: 404 });
                    }

                    const commissionAmount = parseFloat(commission) || 10.00;

                    // Create referral record
                    const referral = await ctx.context.adapter.create({
                        model: "referrals",
                        data: {
                            partnerId: partner.id,
                            referredUserId,
                            referralCode,
                            commission: commissionAmount,
                            status: 'pending',
                            createdAt: new Date()
                        }
                    });

                    // Update partner's total earnings
                    await ctx.context.adapter.update({
                        model: "partners",
                        where: [
                            {
                                field: "id",
                                operator: "eq",
                                value: partner.id
                            }
                        ],
                        update: {
                            totalEarnings: partner.totalEarnings + commissionAmount
                        }
                    });

                    return ctx.json({
                        message: "Referral tracked successfully",
                        data: referral
                    });
                } catch (err) {
                    console.error("Track referral error:", err);
                    return ctx.json({
                        error: "Failed to track referral"
                    }, { status: 500 });
                }
            }),

            // Validate referral code (for signup forms)
            validateReferralCode: createAuthEndpoint("/partners/validate-code", {
                method: "POST",
                body: z.object({
                    referralCode: z.string({
                        required_error: "Referral code is required"
                    })
                })
            }, async (ctx) => {
                const { referralCode } = ctx.body;

                try {
                    const partner = await ctx.context.adapter.findOne({
                        model: "partners",
                        where: [
                            {
                                field: "referralCode",
                                operator: "eq",
                                value: referralCode
                            }
                        ]
                    }) as { id: string; type: string; referralCode: string } | null;

                    return ctx.json({
                        valid: !!partner,
                        partner: partner ? {
                            id: partner.id,
                            type: partner.type,
                            referralCode: partner.referralCode
                        } : null
                    });
                } catch (err) {
                    console.error("Validate referral code error:", err);
                    return ctx.json({
                        error: "Failed to validate referral code"
                    }, { status: 500 });
                }
            })
        }
    } satisfies BetterAuthPlugin;
};