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

type PokemonArgs = {
  offset?: number;
  limit?: number;
};

type PokemonIdArgs = {
  id: number;
};

type LoginArgs = {
  email: string;
  password: string;
};

type CreatePokemonArgs = Prisma.PokemonCreateInput;

type UpdatePokemonArgs = Prisma.PokemonUpdateInput & { id: number };

type DeletePokemonArgs = {
  id: number;
};

export const resolvers = {
  Query: {
    pokemons: async (_: unknown, args: PokemonArgs, context: Context): Promise<Pokemon[]> => {
      const { offset = 0, limit = 50 } = args;
      return await prisma.pokemon.findMany({
        skip: offset,
        take: limit,
        include: { abilities: true, weaknesses: true },
      });
    },
    pokemonsCount: async (_: unknown, __: unknown, context: Context): Promise<number> => {
      return await prisma.pokemon.count();
    },
    pokemon: async (_: unknown, { id }: PokemonIdArgs, context: Context): Promise<Pokemon | null> => {
      return await prisma.pokemon.findUnique({
        where: { id },
        include: { abilities: true, weaknesses: true },
      });
    },
  },
  Mutation: {
    login: async (_: unknown, { email, password }: LoginArgs): Promise<{ token: string; user: { id: number; email: string } }> => {
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
    createPokemon: async (_: unknown, args: CreatePokemonArgs, context: Context): Promise<Pokemon> => {
      if (!context.user) throw new Error('Unauthorized');
      return await prisma.pokemon.create({
        data: args,
        include: { abilities: true, weaknesses: true },
      });
    },
    updatePokemon: async (_: unknown, { id, ...data }: UpdatePokemonArgs, context: Context): Promise<Pokemon> => {
      if (!context.user) throw new Error('Unauthorized');
      return await prisma.pokemon.update({
        where: { id },
        data,
        include: { abilities: true, weaknesses: true },
      });
    },
    deletePokemon: async (_: unknown, { id }: DeletePokemonArgs, context: Context): Promise<boolean> => {
      if (!context.user) throw new Error('Unauthorized');
      await prisma.pokemon.delete({
        where: { id },
      });
      return true;
    },
  },
};
 