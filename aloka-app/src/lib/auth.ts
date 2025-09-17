import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

// Use standard Prisma client for regular PostgreSQL connection
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value;
  
  if (!sessionId) {
    return null;
  }

  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!session) {
      return null;
    }

    // Check if session is expired
    if (new Date() > session.expires) {
      // Delete expired session
      await prisma.session.delete({ where: { id: sessionId } });
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}