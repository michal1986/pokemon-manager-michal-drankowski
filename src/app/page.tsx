"use client";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "../lib/apolloClient";
import PokemonSearchBar from "../components/PokemonSearchBar";
import PokemonSortBar from "../components/PokemonSortBar";
import PokemonGrid from "../components/PokemonGrid";
import PokemonPagination from "../components/PokemonPagination";
import { useState, useMemo } from "react";
import type { Prisma } from '.prisma/client';


type Pokemon = Prisma.PokemonGetPayload<{
  include: { abilities: true; weaknesses: true }
}>;

interface GetPokemonsResponse {
  pokemons: Pokemon[];
  pokemonsCount: number;
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
    pokemonsCount
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
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'name',
    direction: 'asc'
  });

  const { data, loading, error, refetch } = useQuery<GetPokemonsResponse>(GET_POKEMONS, {
    variables: {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize
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
    setCurrentPage(1); // Reset to first page when changing page size
    refetch({ limit: newSize, offset: 0 });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch({ limit: pageSize, offset: (page - 1) * pageSize });
  };

  const handleSortChange = (key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction });
  };

  // Filter and adapt pokemons data
  const pokemons = useMemo(() => {
    if (!data?.pokemons) return [];
    
    let filtered = data.pokemons
      .filter((p: Pokemon) => {
        // Name filter
        if (filters.name && !p.name.toLowerCase().includes(filters.name.toLowerCase())) {
          return false;
        }

        // Height range filter
        if (p.height !== null) {
          if (filters.minHeight && p.height < parseFloat(filters.minHeight)) return false;
          if (filters.maxHeight && p.height > parseFloat(filters.maxHeight)) return false;
        }

        // Weight range filter
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

    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      
      const aValue = a[sortConfig.key as keyof AdaptedPokemon];
      const bValue = b[sortConfig.key as keyof AdaptedPokemon];
      
      if (aValue === null || bValue === null) return 0;
      
      return sortConfig.direction === 'asc'
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });
  }, [data?.pokemons, filters, sortConfig]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Calculate total pages based on the total count of pokemons
  const totalPages = Math.ceil((data?.pokemonsCount || 0) / pageSize);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <PokemonSearchBar onFiltersChange={setFilters} />
      <div className="flex items-center justify-between mt-6">
        <PokemonSortBar 
          pageSize={pageSize} 
          onPageSizeChange={handlePageSizeChange}
          onSortChange={handleSortChange}
        />
        <PokemonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
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
