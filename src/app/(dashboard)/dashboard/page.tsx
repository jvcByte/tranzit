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

export default async function DashboardPage({ params }: DashboardPageProps) {
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
        console.log('Fetching role for user:', session.user.id);
        // Use the auth.api method for server-side calls
        const roleResult = await authClient.role.getRole({
            query: {
                userId: session.user.id
            },
            fetchOptions: {
                headers: {
                    cookie: (await headers()).get('cookie') || ''
                }
            }
        }).catch(error => {
            console.error('Error in role API call:', error);
            // If there's a 401, try to refresh the session
            if (error.status === 401) {
                console.log('Session might be expired, attempting to refresh...');
                throw new Error('Session expired');
            }
            throw error;
        });

        console.log('Role API result:', JSON.stringify(roleResult, null, 2));

        if (roleResult?.data && 'role' in roleResult.data) {
            userRole = roleResult.data.role as UserRole;
            console.log('Found user role:', userRole);
        } else {
            console.log('No role found in response');
        }
    } catch (error) {
        console.error('Error fetching role from server-side:', error);
        // If session is expired, redirect to login
        if (error instanceof Error && error.message === 'Session expired') {
            console.log('Redirecting to login due to expired session');
            redirect('/login?error=SessionExpired');
        }
        // For other errors, show an error but don't redirect in a way that could cause loops
        console.error('Unexpected error during role verification');
        // Instead of redirecting, we'll let the page render with the error state
        // This prevents the redirect loop while still showing an error
        return (
            <div className="container mx-auto p-6">
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
                    <h2 className="font-bold">Error Loading Dashboard</h2>
                    <p>We couldn&apos;t verify your role. Please try refreshing the page or contact support if the problem persists.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded text-red-800"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }

    // If user has no role, show a message instead of redirecting to prevent loops
    if (!userRole) {
        console.log('User has no role assigned');
        return (
            <div className="container mx-auto p-6">
                <div className="border p-4 rounded">
                    <h2 className="font-bold">Role Not Assigned</h2>
                    <p>You need to complete your profile setup before accessing the dashboard.</p>
                    <div className="mt-4">
                        <a
                            href="/welcome"
                            className="px-4 py-2 rounded"
                        >
                            Complete Profile
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // If user's role doesn't match the route, redirect to their correct dashboard
    if (userRole !== expectedRole) {
        console.log(`Role mismatch: user has ${userRole}, URL expects ${expectedRole}`);
        redirect(`/dashboard/${userRole}`);
    }

    console.log('✅ Role validation passed, rendering dashboard');

}