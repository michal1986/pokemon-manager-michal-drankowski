import { PrismaClient } from '@prisma/client';

export type Context = {
  user?: {
    id: number;
    email: string;
  };
  prisma: PrismaClient;
}; 