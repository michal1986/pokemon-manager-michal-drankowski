import { PrismaClient } from '@prisma/client';
import type { Prisma } from '.prisma/client';

type Pokemon = Prisma.PokemonGetPayload<{}>;

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    pokemons: async (): Promise<Pokemon[]> => {
      return await prisma.pokemon.findMany();
    },
    pokemon: async (_: unknown, { id }: { id: number }): Promise<Pokemon | null> => {
      return await prisma.pokemon.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createPokemon: async (_: unknown, args: Prisma.PokemonCreateInput, context: any): Promise<Pokemon> => {
      if (!context.user) throw new Error('Unauthorized');
      return await prisma.pokemon.create({
        data: args,
      });
    },
    updatePokemon: async (_: unknown, { id, ...data }: Prisma.PokemonUpdateInput & { id: number }, context: any): Promise<Pokemon> => {
      if (!context.user) throw new Error('Unauthorized');
      return await prisma.pokemon.update({
        where: { id },
        data,
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
 