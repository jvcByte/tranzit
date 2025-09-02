"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { User } from "better-auth";

type UserRole = 'driver' | 'affiliate' | 'partner' | 'admin';

type RoleApiResponse = {
    data?: {
        success: boolean;
        message?: string;
        role?: UserRole;
    };
    error?: string | {
        message?: string;
        code?: string;
        status?: number;
    };
};

const benefits = {
    driver: [
        'Earn competitive rates for your services',
        'Flexible working hours',
        'Access to premium ride requests',
        'Weekly payouts',
        '24/7 support'
    ],
    affiliate: [
        'Earn commissions on every referral',
        'Access to marketing materials',
        'Performance bonuses',
        'Dedicated account manager',
        'Real-time tracking'
    ],
    partner: [
        'Access to enterprise tools',
        'Dedicated support team',
        'Custom integration options',
        'Volume discounts',
        'Priority service'
    ]
};

export default function WelcomePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [hasExistingRole, setHasExistingRole] = useState(false);

    useEffect(() => {
        // Check if user is authenticated and get their current role
        const checkAuth = async () => {
            try {
                const { data: session, error } = await authClient.getSession();

                if (error || !session?.user) {
                    // If not authenticated, redirect to login
                    router.push('/login');
                    return;
                }

                setUser(session.user);

                try {
                    // Check if the user already has a role
                    const roleResponse = await authClient.role.getRole({
                        query: {
                            userId: session.user.id
                        }
                    });

                    console.log('Role check response:', roleResponse);

                    // If user has an existing role, redirect to their dashboard
                    if (roleResponse.data && 'role' in roleResponse.data && roleResponse.data.role) {
                        const existingRole = roleResponse.data.role as UserRole;
                        console.log('User has existing role:', existingRole);

                        setHasExistingRole(true);

                        // Update user state with existing role
                        const userWithRole = {
                            ...session.user,
                            role: existingRole
                        };
                        setUser(userWithRole);

                        // Redirect to dashboard with existing role
                        router.push(`/dashboard/${existingRole}`);
                        return;
                    }

                    // User doesn't have a role yet - show role selection
                    console.log('User has no existing role, showing role selection');
                    setHasExistingRole(false);

                } catch (roleError) {
                    console.error('Error checking user role:', roleError);
                    // If there's an error checking role, assume no role exists and show selection
                    setHasExistingRole(false);
                }

            } catch (error) {
                console.error('Error checking auth status:', error);
                router.push('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleRoleSelect = async (role: UserRole) => {
        if (!user?.id) {
            toast.error('User not authenticated');
            return;
        }

        setSelectedRole(role);

        try {
            console.log('Setting new role:', { role, userId: user.id });

            // Set the user's role
            const response = await authClient.role.setRole({
                role,
                userId: user.id
            }) as unknown as RoleApiResponse;

            console.log('Role set response:', response);

            // Handle error response
            if (!response) {
                console.error('No response from role update');
                toast.error('No response from server');
                setSelectedRole(null);
                return;
            }

            // Check for error response
            const error = typeof response === 'object' && 'error' in response ? response.error : null;
            if (error) {
                const errorMessage = typeof error === 'string'
                    ? error
                    : error?.message || 'Failed to set role';
                console.error('Failed to set role:', error);
                toast.error(errorMessage);
                setSelectedRole(null);
                return;
            }

            // Handle success response
            if (response.data?.success) {
                console.log('Role set successfully:', response.data);

                // Update local user state with the new role
                setUser(prev => prev ? { ...prev, role } : null);

                // Show success message
                toast.success(`Welcome ${role}! Redirecting to your dashboard...`);

                // Redirect to the appropriate dashboard
                setTimeout(() => {
                    router.push(`/dashboard/${role}`);
                }, 1500);
            } else {
                console.error('Unexpected response format:', response);
                toast.error('Role set but received unexpected response');
                // Still redirect since the role was likely updated
                setTimeout(() => {
                    router.push(`/dashboard/${role}`);
                }, 1500);
            }
        } catch (error) {
            console.error('Error setting role:', error);
            toast.error('An unexpected error occurred while setting your role');
            setSelectedRole(null);
        }
    };

    // Show loading spinner while checking authentication and role
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If user has existing role, this component shouldn't render (redirect handled in useEffect)
    if (hasExistingRole) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Show role selection for users without a role
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Tranzit!</h1>
                    {user && (
                        <p className="text-xl mt-2">Hello, {user.name || user.email}!</p>
                    )}
                    <p className="text-lg">Choose your role to get started</p>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="text-2xl font-semibold text-center mb-8">Select your role</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {(['driver', 'affiliate', 'partner'] as const).map((role) => (
                            <button
                                key={role}
                                onClick={() => handleRoleSelect(role)}
                                disabled={selectedRole !== null}
                                className={`p-6 rounded-lg border-2 transition-all ${selectedRole === role
                                    ? 'border-primary bg-primary/10'
                                    : 'border-gray-200 hover:border-primary/70'
                                    } ${selectedRole !== null ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'}`}
                            >
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold capitalize mb-4 dark:text-primary">
                                        {role === 'driver' ? '🚗 Driver' :
                                            role === 'affiliate' ? '🤝 Affiliate' : '🏢 Partner'}
                                    </h3>
                                    <ul className="text-left space-y-3 mb-6 min-h-[120px]">
                                        {benefits[role].map((benefit, index) => (
                                            <li key={index} className="flex items-start text-sm leading-5">
                                                <svg
                                                    className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2.5}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                <span className="dark:text-gray-500">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className={`px-4 py-2 rounded-md border hover:border-primary bg-primary/20 dark:text-white font-medium  ${selectedRole === role ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
                                        {selectedRole === role ? (
                                            <div className="flex items-center justify-center">
                                                <span className="mr-2">Setting up...</span>
                                                <span className="animate-spin">↻</span>
                                            </div>
                                        ) : (
                                            `Select ${role.charAt(0).toUpperCase() + role.slice(1)}`
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-sm text-gray-500">
                            You can change your role later in your account settings
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}