import { PrismaClient } from '@prisma/client';

// PrismaClient is instantiated once and reused across hot reloads in development
// and across invocations in production serverless environments.
// This prevents multiple connections to the database.

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
