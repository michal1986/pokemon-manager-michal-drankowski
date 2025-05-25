import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/graphql/schema';
import { resolvers, Context } from '@/graphql/resolvers';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const prisma = new PrismaClient();
const JWT_SECRET = 'your-secret-key';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

async function getContext(req: NextApiRequest): Promise<Context> {
  const token = req.headers.authorization?.replace('Bearer ', '');
  let user: { id: number; email: string } | undefined;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      user = {
        id: decoded.userId,
        email: 'admin@pokemon.com' // Since we're using hardcoded user
      };
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  }

  return {
    user,
    prisma
  };
}

export default startServerAndCreateNextHandler(server, {
  context: async (req) => getContext(req)
}); 