import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth/auth-client";

// Extend the session user type to include role
type UserRole = 'driver' | 'affiliate' | 'partner';

interface DashboardPageProps {
    params: Promise<{
        role: UserRole;
    }>;
}

export default async function RoleDashboard({ params }: DashboardPageProps) {
    // Await the params since they're now a Promise in Next.js 15
    const { role: expectedRole } = await params;
    console.log('=== DASHBOARD PAGE LOADED ===');
    console.log('Expected role from URL:', expectedRole);

    // Check authentication first
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // If no session, redirect to login
    if (!session?.user) {
        console.log('No session found, redirecting to login');
        redirect('/login');
    }

    console.log('Session found for user:', session.user.id);

    // Get user role directly from the database using server-side method
    let userRole: UserRole | null = null;

    try {
        // Use the auth.api method for server-side calls
        const roleResult = await authClient.role.getRole({
            query: {
                userId: session.user.id
            }
        });

        console.log('Role API result:', roleResult);

        if (roleResult?.data && 'role' in roleResult.data) {
            userRole = roleResult.data.role as UserRole;
            console.log('Found user role:', userRole);
        }
    } catch (error) {
        console.error('Error fetching role from server-side:', error);
        // If we can't get the role, redirect to welcome to set it up
        redirect('/welcome');
    }

    // If user has no role, redirect to welcome page to set one up
    if (!userRole) {
        console.log('User has no role, redirecting to welcome');
        redirect('/welcome');
    }

    // If user's role doesn't match the route, redirect to their correct dashboard
    if (userRole !== expectedRole) {
        console.log(`Role mismatch: user has ${userRole}, URL expects ${expectedRole}`);
        redirect(`/dashboard/${userRole}`);
    }

    console.log('✅ Role validation passed, rendering dashboard');

    // Role-specific content
    const roleContent = {
        driver: {
            title: 'Driver Dashboard',
            description: 'Manage your driving activities and earnings',
        },
        affiliate: {
            title: 'Affiliate Dashboard',
            description: 'Track your referrals and commissions',
        },
        partner: {
            title: 'Partner Dashboard',
            description: 'Manage your partnership and integrations',
        },
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{roleContent[expectedRole].title}</h1>
            <p className="text-gray-600 mb-8">{roleContent[expectedRole].description}</p>

            {/* Add role-specific components here */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Welcome, {session.user.name}!</h2>
                <p>This is your {expectedRole} dashboard. More content coming soon!</p>
                <div className="mt-4 text-sm text-gray-500">
                    <p>User ID: {session.user.id}</p>
                    <p>Role: {userRole}</p>
                    <p>Route Role: {expectedRole}</p>
                </div>
            </div>
        </div>
    );
}