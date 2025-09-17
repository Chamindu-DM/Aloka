'use server';

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { error } from "console";

// Use standard Prisma client for regular PostgreSQL connection
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

export async function authenticateUser(formData: FormData){
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password){
        return { error: 'Email and password are required'};
    }

    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: {email}
        });

        // check if user exists
        if(!user){
            return { error: 'Invalid email or password'};
        }

        // verify password
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch){
            return{error: 'Invalid email or password'};
        }

        // create session
        const session = await prisma.session.create({
            data: {
                userId: user.id,
                expires: new Date(Date.now() + 7*24*60*60*1000), // 1 week
            },
        });

        // Set session cookie (fix typo: use 'sessionId')
        const cookieStore = await cookies();
        cookieStore.set('sessionId', session.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7*24*60*60, // 1 week
            path: '/',
        });

        return { success: true};
    } catch (error){
        console.error('Authentication error:', error);
        return {error: 'Failed to authenticate'};
    }
}

export async function registerUser(formData : FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name')as string;

    if (!email || !password){
        return{ error: 'Email and password are required'};
    }

    try{
        //check if user already exists
        console.log('Checking if user exists:', email);
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.log('User already exists with this email');
            return { error: 'User with this email already exists' };
        }

        console.log('Hashing password...');
        const passwordHash = await bcrypt.hash(password, 10);

        console.log('Creating new user...');
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
            },
        });
        
        console.log('User created successfully:', user.id);
        return { success: true };
    } catch (error: any) {
        console.error('Registration error:', error);
        // Return more specific error message for debugging
        const errorMessage = error.message || 'Failed to register user';
        const errorCode = error.code || 'UNKNOWN';
        return { 
            error: `Registration failed: ${errorMessage} (Code: ${errorCode})`,
            details: error
        };
    }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value;
  
  if (sessionId) {
    // Delete session from database
    try {
      await prisma.session.delete({
        where: { id: sessionId },
      });
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  }
  
  // Remove the cookie
  cookieStore.delete('sessionId');
  
  return { success: true };
}