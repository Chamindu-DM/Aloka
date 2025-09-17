import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default async function Dashboard() {
  const user = await getCurrentUser();
  
  // Redirect to sign-in if not authenticated
  if (!user) {
    redirect('/signin');
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>
      
      <p className="mb-6 text-lg">Welcome, <span className="font-semibold">{user.name || user.email}!</span></p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card - Uses server component data */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Your Profile</h2>
          <div className="space-y-3">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {user.name || 'Not set'}</p>
            <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        
        {/* API demo card - Shows both auth methods */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">API Integration Demo</h2>
          <p className="mb-4 text-sm text-gray-600">
            This app demonstrates two ways to access backend data:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Server Components with direct Prisma access (this page)</li>
            <li>API Routes for client-side data fetching (test below)</li>
          </ul>
          <div className="mt-4">
            <Link href="/api/hello" className="text-blue-600 hover:text-blue-800 mr-4" target="_blank">
              Test Public API →
            </Link>
            <Link href="/api/user" className="text-blue-600 hover:text-blue-800" target="_blank">
              Test Auth API →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}