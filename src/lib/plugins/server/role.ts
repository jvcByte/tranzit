import { createAuthEndpoint, sessionMiddleware } from "better-auth/api";
import type { BetterAuthPlugin } from "better-auth";
import { z } from "zod";

export const rolePlugin = () => {
    return {
        id: "role",
        schema: {
            user_roles: {
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
                    role: {
                        type: "string",
                        required: true,
                    },
                    createdAt: {
                        type: "date"
                    },
                    updatedAt: {
                        type: "date"
                    }
                }
            }
        },
        endpoints: {
            // Set user role
            setRole: createAuthEndpoint("/role/set-role", {
                method: "POST",
                use: [sessionMiddleware],
                body: z.object({
                    role: z.enum(["driver", "affiliate", "partner", "admin"]).default("driver"),
                    userId: z.string().optional() // Optional, defaults to current user
                })
            }, async (ctx) => {
                const session = ctx.context.session;
                if (!session) {
                    return ctx.json({ error: "Not authenticated" }, { status: 401 });
                }

                const { role, userId } = ctx.body;
                const targetUserId = userId || session.user.id;

                // Check if the current user has permission to set this role
                if (userId && userId !== session.user.id) {
                    const currentUserRole = await ctx.context.adapter.findOne({
                        model: "user_roles",
                        where: [{
                            field: "userId",
                            operator: "eq",
                            value: session.user.id
                        }]
                    });

                    if (!currentUserRole) {
                        return ctx.json({ error: "User not found" }, { status: 404 });
                    }

                    const currentRole = (currentUserRole as { role: string }).role as "driver" | "affiliate" | "partner" | "admin";
                    if (!currentRole || currentRole !== "admin") {
                        return ctx.json({ error: "Insufficient permissions" }, { status: 403 });
                    }
                }

                try {
                    // Check if user already has a role
                    const existingRole = await ctx.context.adapter.findOne({
                        model: "user_roles",
                        where: [{
                            field: "userId",
                            operator: "eq",
                            value: targetUserId
                        }]
                    });

                    if (existingRole) {
                        // Update existing role
                        await ctx.context.adapter.update({
                            model: "user_roles",
                            where: [{
                                field: "userId",
                                operator: "eq",
                                value: targetUserId
                            }],
                            update: {
                                role,
                                updatedAt: new Date()
                            }
                        });
                    } else {
                        // Create new role
                        await ctx.context.adapter.create({
                            model: "user_roles",
                            data: {
                                userId: targetUserId,
                                role,
                                createdAt: new Date(),
                                updatedAt: new Date()
                            }
                        });
                    }

                    return ctx.json({
                        success: true,
                        message: `Role updated to ${role} successfully`,
                        role
                    });
                } catch (error) {
                    console.error("Error updating role:", error);
                    return ctx.json(
                        { error: "Failed to update role" },
                        { status: 500 }
                    );
                }
            }),

            // Get user role - Using GET method with query parameters
            getRole: createAuthEndpoint("/role/get-role", {
                method: "GET",
                use: [sessionMiddleware],
                query: z.object({
                    userId: z.string().optional() // Optional, defaults to current user
                })
            }, async (ctx) => {
                const session = ctx.context.session;
                if (!session) {
                    return ctx.json({ error: "Not authenticated" }, { status: 401 });
                }

                const { userId } = ctx.query;
                const targetUserId = userId || session.user.id;

                try {
                    const roleData = await ctx.context.adapter.findOne({
                        model: "user_roles",
                        where: [{
                            field: "userId",
                            operator: "eq",
                            value: targetUserId
                        }]
                    });

                    console.log("Role data:", roleData);
                    console.log("Target user ID:", targetUserId);

                    return ctx.json({
                        success: true,
                        role: (roleData as { role: string })?.role || null,
                        userId: targetUserId
                    });
                } catch (error) {
                    console.error("Error fetching role:", error);
                    return ctx.json(
                        { error: "Failed to fetch role" },
                        { status: 500 }
                    );
                }
            })
        }
    } satisfies BetterAuthPlugin;
};