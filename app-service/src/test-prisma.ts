import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Testing Prisma in app-service...');
  try {
    const adsenseCount = await prisma.adsense.count();
    console.log(`Found ${adsenseCount} adsenses.`);
    // You could add a more specific query here if needed
    // e.g., const firstAdsense = await prisma.adsense.findFirst();
    // console.log('First adsense:', firstAdsense);
    console.log('Prisma client in app-service connected and queried successfully!');
  } catch (error) {
    console.error('Error testing Prisma in app-service:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
