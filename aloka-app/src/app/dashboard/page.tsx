import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function Dashboard() {
  const user = await getCurrentUser();
  
  // Redirect to sign-in if not authenticated
  if (!user) {
    redirect('/signin');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome, {user.name || user.email}!</p>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}