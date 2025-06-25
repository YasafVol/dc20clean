import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Query the CharacterInProgress model
    const testData = await prisma.characterInProgress.findFirst(); 

    return json({
      status: 'success',
      message: 'Database connection successful!',
      data: testData,
    });
  } catch (error: any) { // Cast error to any to access message property
    console.error('Database connection test failed:', error);
    return json({
      status: 'error',
      message: 'Database connection failed.',
      error: error.message,
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
