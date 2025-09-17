# Aloka - Next.js Full Stack Application

This is a [Next.js](https://nextjs.org) project that includes user authentication, PostgreSQL database integration, and API routes.

## Project Overview

This project uses:
- **Next.js 15** with App Router
- **Prisma** for database ORM
- **PostgreSQL** as the database
- **Tailwind CSS** for styling
- **bcryptjs** for password hashing

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL database
- npm or yarn

### Installation and Setup

1. **Install dependencies**

```powershell
npm install
```

2. **Database Setup**

Make sure your `.env` file contains your PostgreSQL connection string:

```
DATABASE_URL="postgresql://username:password@localhost:5432/aloka?schema=public"
```

3. **Run Database Migrations**

```powershell
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed the database with a test user
npx ts-node src/lib/setupDb.ts
```

This creates a test user:
- Email: `test@example.com` 
- Password: `password123`

4. **Start the Development Server**

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Key Routes

- `/signin` - Login page
- `/signup` - Registration page
- `/dashboard` - Protected dashboard (requires authentication)
- `/debug` - Authentication debugging tools
- `/api/hello` - Public API endpoint
- `/api/user` - Protected API endpoint (requires authentication)

## Troubleshooting

### Common Issues

- **Not authenticated error**: Make sure you're logged in before accessing protected routes
- **Registration errors**: Check server logs for details on what's failing
- **Missing tables**: Run migrations again with `npx prisma migrate dev`

### Specific Solutions

1. **Prisma Database Connection Issues**:
   - Make sure PostgreSQL is running
   - If you see `Error validating datasource db: the URL must start with the protocol prisma://`, check that you're using the standard client import: `import { PrismaClient } from '@prisma/client'` (not edge)

2. **Database Reset**:
   - If needed, completely reset the database: `npx prisma migrate reset --force`

3. **Cookie Issues**:
   - Check the `/debug` page to verify if cookies are being set properly

## Project Structure

### Key Files

- `src/lib/actions.ts` - Server actions for authentication
- `src/lib/auth.ts` - Authentication utilities
- `prisma/schema.prisma` - Database schema definition
- `src/app/api/*` - API routes
- `src/app/signin` & `src/app/signup` - Authentication pages
- `src/app/dashboard` - Protected user dashboard

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
