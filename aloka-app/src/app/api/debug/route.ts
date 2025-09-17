import { NextRequest, NextResponse } from 'next/server';

// Simple API for testing authentication debugging
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Debug API is working',
    cookiesPresent: request.cookies.size > 0,
    sessionCookiePresent: request.cookies.has('sessionId'),
    timestamp: new Date().toISOString()
  });
}