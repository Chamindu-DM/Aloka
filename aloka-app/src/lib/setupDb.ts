import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { create } from "domain";

const prisma = new PrismaClient();

async function main() {
    try{
        //create a test user
        const hashedPassword = await bcrypt.hash('password123', 10);

        await prisma.user.upsert({
            where: { email:'test@example.com'},
            update:{},
            create: {
                email: 'test@example.com',
                passwordHash: hashedPassword,
                name: 'Test User',
            },
        });

        console.log('Database seeded successfully');
    } catch (error){
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();