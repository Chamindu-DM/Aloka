'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    
    const formData = new FormData(event.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Replace with your actual registration API call
      // const result = await registerUser(formData);
      // if (result.error) {
      //   setError(result.error);
      // } else {
      //   setSuccess(true);
      //   // Redirect after successful signup
      //   setTimeout(() => {
      //     window.location.href = '/signin';
      //   }, 2000);
      // }
      
      // For demo purposes:
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-500">Aloka</span>
          </h1>
          <p className="text-gray-500">Create your account</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          {success ? (
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="text-green-700">Account created successfully! Redirecting to sign in...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              
              <button 
                type="submit" 
                className="mt-2 w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Sign Up
              </button>
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-2">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </form>
          )}
          
          <div className="mt-6 text-center pt-5 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/signin" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
