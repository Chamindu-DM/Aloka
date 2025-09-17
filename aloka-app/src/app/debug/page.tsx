'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AuthDebug() {
  const [sessionCookie, setSessionCookie] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get session cookie on load
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('sessionId='));
    setSessionCookie(sessionCookie ? sessionCookie.trim() : null);
  }, []);

  // Test API call
  const testApi = async (endpoint: string) => {
    setIsLoading(true);
    setApiResponse(null);
    setApiError(null);
    
    try {
      const response = await fetch(`/api/${endpoint}`);
      const data = await response.json();
      setApiResponse(data);
    } catch (err: any) {
      setApiError(err.message || 'Error fetching API');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear session cookie
  const clearCookie = () => {
    document.cookie = 'sessionId=; Max-Age=0; path=/;';
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Auth Debugging</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Session Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Session Info</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Session Cookie:</h3>
            {sessionCookie ? (
              <div className="bg-gray-50 p-3 rounded-md overflow-x-auto">
                <code>{sessionCookie}</code>
              </div>
            ) : (
              <div className="text-amber-600 bg-amber-50 p-3 rounded-md">
                No session cookie found. You are not logged in.
              </div>
            )}
          </div>
          
          <div className="flex gap-2 mt-4">
            <button 
              onClick={clearCookie}
              className="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Clear Cookie
            </button>
            <Link 
              href="/signin" 
              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
        
        {/* API Testing */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">API Testing</h2>
          
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => testApi('hello')}
              className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              Test Public API
            </button>
            <button 
              onClick={() => testApi('user')}
              className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              Test Auth API
            </button>
          </div>
          
          {isLoading && (
            <div className="text-center py-3">Loading...</div>
          )}
          
          {apiResponse && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Response:</h3>
              <div className="bg-gray-50 p-3 rounded-md overflow-x-auto">
                <pre className="text-sm">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            </div>
          )}
          
          {apiError && (
            <div className="mt-4 text-red-600 bg-red-50 p-3 rounded-md">
              Error: {apiError}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Troubleshooting Steps</h2>
        
        <ol className="list-decimal pl-5 space-y-3">
          <li>
            <strong>Database Migration:</strong> Run <code>npx prisma migrate dev --name init_new</code> to create a fresh migration that matches your schema.
          </li>
          <li>
            <strong>Database Seed:</strong> Run <code>npx ts-node src/lib/setupDb.ts</code> to seed the database with a test user.
          </li>
          <li>
            <strong>Test Login:</strong> Try to sign in with <code>test@example.com</code> / <code>password123</code> (after seeding).
          </li>
          <li>
            <strong>Create Account:</strong> If login fails, try creating a new account on the signup page.
          </li>
          <li>
            <strong>Check Cookies:</strong> After signing in, verify that a session cookie was set (shown above).
          </li>
        </ol>
      </div>
      
      <div className="mt-6 text-center">
        <Link 
          href="/" 
          className="text-blue-600 hover:underline"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}