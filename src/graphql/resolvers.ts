import { PrismaClient } from '@prisma/client';
import type { Prisma } from '.prisma/client';
import jwt from 'jsonwebtoken';

type Pokemon = Prisma.PokemonGetPayload<{
  include: { abilities: true; weaknesses: true }
}>;

const prisma = new PrismaClient();
const JWT_SECRET = 'your-secret-key';

// Hardcoded user
const HARDCODED_USER = {
  id: 1,
  email: 'admin@pokemon.com',
  password: 'pokemon123'
};

export type Context = {
  user?: {
    id: number;
    email: string;
  };
  prisma: PrismaClient;
};

export const resolvers = {
  Query: {
    pokemons: async (_:unknown, args: {offset:number, limit:number}): Promise<Pokemon[]> => {
      const { offset = 0, limit = 50 } = args;
      return await prisma.pokemon.findMany({
        skip: offset,
        take: limit,
        include: { abilities: true, weaknesses: true },
      });
    },
    pokemon: async (_: unknown, { id }: { id: number }): Promise<Pokemon | null> => {
      return await prisma.pokemon.findUnique({
        where: { id },
        include: { abilities: true, weaknesses: true },
      });
    },
  },
  Mutation: {
    login: async (_: unknown, { email, password }: { email: string; password: string }) => {
      if (email !== HARDCODED_USER.email || password !== HARDCODED_USER.password) {
        throw new Error('Invalid credentials');
      }
      
      const token = jwt.sign({ userId: HARDCODED_USER.id }, JWT_SECRET);
      return {
        token,
        user: {
          id: HARDCODED_USER.id,
          email: HARDCODED_USER.email,
        },
      };
    },
    createPokemon: async (_: unknown, args: Prisma.PokemonCreateInput, context: Context): Promise<Pokemon> => {
      if (!context.user) throw new Error('Unauthorized');
      return await prisma.pokemon.create({
        data: args,
        include: { abilities: true, weaknesses: true },
      });
    },
    updatePokemon: async (_: unknown, { id, ...data }: Prisma.PokemonUpdateInput & { id: number }, context: Context): Promise<Pokemon> => {
      if (!context.user) throw new Error('Unauthorized');
      return await prisma.pokemon.update({
        where: { id },
        data,
        include: { abilities: true, weaknesses: true },
      });
    },
    deletePokemon: async (_: unknown, { id }: { id: number }, context: Context): Promise<boolean> => {
      if (!context.user) throw new Error('Unauthorized');
      await prisma.pokemon.delete({
        where: { id },
      });
      return true;
    },
  },
};
 