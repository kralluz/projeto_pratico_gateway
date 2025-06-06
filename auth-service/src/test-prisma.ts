import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Testing Prisma in auth-service...');
  try {
    const userCount = await prisma.user.count();
    console.log(`Found ${userCount} users.`);
    // You could add a more specific query here if needed
    // e.g., const firstUser = await prisma.user.findFirst();
    // console.log('First user:', firstUser);
    console.log('Prisma client in auth-service connected and queried successfully!');
  } catch (error) {
    console.error('Error testing Prisma in auth-service:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
