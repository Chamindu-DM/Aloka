import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

// Example of an API route that uses the auth system
export async function GET(request: NextRequest) {
  try {
    // Get the current user from the auth system
    const user = await getCurrentUser();
    
    if (!user) {
      // Return 401 if not authenticated
      return NextResponse.json(
        { error: 'Not authenticated' }, 
        { status: 401 }
      );
    }
    
    // Return user data without sensitive information
    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    });
    
  } catch (error) {
    console.error('Error in user API route:', error);
    return NextResponse.json(
      { error: 'Server error' }, 
      { status: 500 }
    );
  }
}