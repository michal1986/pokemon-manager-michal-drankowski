"use client";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "../lib/apolloClient";
import PokemonSearchBar from "../components/PokemonSearchBar";
import PokemonSortBar from "../components/PokemonSortBar";
import PokemonGrid from "../components/PokemonGrid";
import { useState, useMemo } from "react";
import type { Prisma } from '.prisma/client';


type Pokemon = Prisma.PokemonGetPayload<{
  include: { abilities: true; weaknesses: true }
}>;

interface GetPokemonsResponse {
  pokemons: Pokemon[];
}

const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      id
      name
      type
      height
      weight
      abilities {
        id
        name
      }
      weaknesses {
        id
        name
      }
    }
  }
`;

interface SearchFilters {
  name: string;
  minHeight: string;
  maxHeight: string;
  minWeight: string;
  maxWeight: string;
}


export interface AdaptedPokemon extends Omit<Pokemon, 'type'> {
  number: string;
  types: string[];
}

function PokemonsPageContent() {
  const [pageSize, setPageSize] = useState(20);
  const { data, loading, error, refetch } = useQuery<GetPokemonsResponse>(GET_POKEMONS, {
    variables: {
      limit: pageSize,
      offset: 0
    }
  });
  const [filters, setFilters] = useState<SearchFilters>({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
  });

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    refetch({ limit: newSize, offset: 0 });
  };

  // Filter and adapt pokemons data
  const pokemons = useMemo(() => {
    if (!data?.pokemons) return [];
    
    return data.pokemons
      .filter((p: Pokemon) => {
        if (filters.name && !p.name.toLowerCase().includes(filters.name.toLowerCase())) {
          return false;
        }

        if (p.height !== null) {
          if (filters.minHeight && p.height < parseFloat(filters.minHeight)) return false;
          if (filters.maxHeight && p.height > parseFloat(filters.maxHeight)) return false;
        }

        if (p.weight !== null) {
          if (filters.minWeight && p.weight < parseFloat(filters.minWeight)) return false;
          if (filters.maxWeight && p.weight > parseFloat(filters.maxWeight)) return false;
        }

        return true;
      })
      .map((p: Pokemon): AdaptedPokemon => ({
        ...p,
        number: p.id.toString(),
        types: Array.isArray(p.type) ? p.type : [p.type],
      }));
  }, [data?.pokemons, filters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <PokemonSearchBar onFiltersChange={setFilters} />
      <PokemonSortBar pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <PokemonsPageContent />
    </ApolloProvider>
  );
}
