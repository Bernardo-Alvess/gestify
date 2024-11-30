import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient({
//     log: ['query', 'info', 'warn', 'error'],
// });

const prisma = new PrismaClient()

async function connect() {
    try {
        await prisma.$connect();
        console.log('Connected to database ✔️')
    } catch (e) {
        console.error('Failed to connect to the database ❌', e)
    }
}

connect()

export { prisma }