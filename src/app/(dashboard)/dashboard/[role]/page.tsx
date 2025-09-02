import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { AppSidebar } from "@/components/layout/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { LayoutProvider } from "@/context/layout-provider"
import { TopNav } from "@/components/layout/top-nav"
import { Search } from "@/components/search"
import { SearchProvider } from "@/context/search-provider"
import { ThemeSwitch } from "@/components/theme-switch"
import { ProfileDropdown } from "@/components/profile-dropdown"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Overview } from '../components/overview'
import { RecentSales } from '../components/recent-sales'
import { Main } from "@/components/layout/main";
import { Header } from "@/components/layout/header";

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
    console.log('=== ROLE DASHBOARD PAGE LOADED ===');
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

    // return (
    //     <div className="container mx-auto p-6">
    //         <h1 className="text-3xl font-bold mb-4">{roleContent[expectedRole].title}</h1>
    //         <p className="text-gray-600 mb-8">{roleContent[expectedRole].description}</p>

    //         {/* Add role-specific components here */}
    //         <div className="bg-white p-6 rounded-lg shadow">
    //             <h2 className="text-xl font-semibold mb-4">Welcome, {session.user.name}!</h2>
    //             <p>This is your {expectedRole} dashboard. More content coming soon!</p>
    //             <div className="mt-4 text-sm text-gray-500">
    //                 <p>User ID: {session.user.id}</p>
    //                 <p>Role: {userRole}</p>
    //                 <p>Route Role: {expectedRole}</p>
    //             </div>
    //         </div>
    //     </div>
    // );


    return (
        <SearchProvider>
            <LayoutProvider>
                <SidebarProvider
                    style={{
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties}
                >
                    <AppSidebar />
                    <SidebarInset>
                        {/* ===== Top Heading ===== */}
                        <Header>
                            <TopNav className="md:font-medium" title={roleContent[expectedRole].title} />
                            <div className='ms-auto flex items-center space-x-4'>
                                <Search />
                                <ThemeSwitch />
                                <ProfileDropdown user={{
                                    name: session.user.name,
                                    email: session.user.email,
                                    avatar: session.user.image || ""
                                }} />
                            </div>
                        </Header>

                        {/* ===== Main ===== */}
                        <Main>
                            <div className='mb-2 flex flex-col items-start justify-between space-y-2'>
                                <h1 className='md:text-2xl text-medium font-bold tracking-wide'>Welcome, &nbsp; {session.user.name}!</h1>
                                <span className="md:text-xl text-base mb-8">{roleContent[expectedRole].description}</span>
                            </div>
                            <Tabs
                                orientation='vertical'
                                defaultValue='overview'
                                className='space-y-4'
                            >
                                <div className='w-full overflow-x-auto pb-2'>
                                    <TabsList>
                                        <TabsTrigger value='overview'>Overview</TabsTrigger>
                                        <TabsTrigger value='analytics' disabled>
                                            Analytics
                                        </TabsTrigger>
                                        <TabsTrigger value='reports' disabled>
                                            Reports
                                        </TabsTrigger>
                                        <TabsTrigger value='notifications' disabled>
                                            Notifications
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                                <TabsContent value='overview' className='space-y-4'>
                                    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                                        <Card>
                                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                                <CardTitle className='text-sm font-medium'>
                                                    Total Revenue
                                                </CardTitle>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    className='text-muted-foreground h-4 w-4'
                                                >
                                                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                                                </svg>
                                            </CardHeader>
                                            <CardContent>
                                                <div className='text-2xl font-bold'>$0.00</div>
                                                <p className='text-muted-foreground text-xs'>
                                                    +0.0% from last month
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                                <CardTitle className='text-sm font-medium'>
                                                    Subscriptions
                                                </CardTitle>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    className='text-muted-foreground h-4 w-4'
                                                >
                                                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                                                    <circle cx='9' cy='7' r='4' />
                                                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                                                </svg>
                                            </CardHeader>
                                            <CardContent>
                                                <div className='text-2xl font-bold'>+0</div>
                                                <p className='text-muted-foreground text-xs'>
                                                    +0.0% from last month
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                                <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    className='text-muted-foreground h-4 w-4'
                                                >
                                                    <rect width='20' height='14' x='2' y='5' rx='2' />
                                                    <path d='M2 10h20' />
                                                </svg>
                                            </CardHeader>
                                            <CardContent>
                                                <div className='text-2xl font-bold'>+0</div>
                                                <p className='text-muted-foreground text-xs'>
                                                    +0.0% from last month
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                                <CardTitle className='text-sm font-medium'>
                                                    Active Now
                                                </CardTitle>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    className='text-muted-foreground h-4 w-4'
                                                >
                                                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                                                </svg>
                                            </CardHeader>
                                            <CardContent>
                                                <div className='text-2xl font-bold'>+0</div>
                                                <p className='text-muted-foreground text-xs'>
                                                    +0 since last hour
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                                        <Card className='col-span-1 lg:col-span-4'>
                                            <CardHeader>
                                                <CardTitle>Overview</CardTitle>
                                            </CardHeader>
                                            <CardContent className='ps-2'>
                                                <Overview />
                                            </CardContent>
                                        </Card>
                                        <Card className='col-span-1 lg:col-span-3'>
                                            <CardHeader>
                                                <CardTitle>Recent Sales</CardTitle>
                                                <CardDescription>
                                                    You made 265 sales this month.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <RecentSales />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </Main>
                    </SidebarInset>
                </SidebarProvider>
            </LayoutProvider>
        </SearchProvider>
    )
}