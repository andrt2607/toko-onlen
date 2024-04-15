import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient }

//akan dipanggil ketika memanggil endpoint
export const prisma = globalForPrisma.prisma || new PrismaClient({log: ["query"]});

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;