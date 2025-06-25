import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Attempt to query a common table, e.g., 'User' or 'Character'
    // If your schema has a different table, this might need adjustment.
    // For a simple test, we'll try to find the first record of a 'User' model.
    // If 'User' doesn't exist, this will throw an error, which is fine for a test.
    const testData = await prisma.user.findFirst(); 

    return json({
      status: 'success',
      message: 'Database connection successful!',
      data: testData,
    });
  } catch (error) {
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
