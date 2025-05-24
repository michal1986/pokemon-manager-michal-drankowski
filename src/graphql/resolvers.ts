import { PrismaClient } from '@prisma/client';
import type { Prisma } from '.prisma/client';

type Pokemon = Prisma.PokemonGetPayload<{
  include: { abilities: true; weaknesses: true }
}>;

const prisma = new PrismaClient();

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
    createPokemon: async (_: unknown, args: Prisma.PokemonCreateInput, context: any): Promise<Pokemon> => {
      if (!context.user) throw new Error('Unauthorized');
      return await prisma.pokemon.create({
        data: args,
        include: { abilities: true, weaknesses: true },
      });
    },
    updatePokemon: async (_: unknown, { id, ...data }: Prisma.PokemonUpdateInput & { id: number }, context: any): Promise<Pokemon> => {
      if (!context.user) throw new Error('Unauthorized');
      return await prisma.pokemon.update({
        where: { id },
        data,
        include: { abilities: true, weaknesses: true },
      });
    },
    deletePokemon: async (_: unknown, { id }: { id: number }, context: any): Promise<boolean> => {
      if (!context.user) throw new Error('Unauthorized');
      await prisma.pokemon.delete({
        where: { id },
      });
      return true;
    },
  },
};
 