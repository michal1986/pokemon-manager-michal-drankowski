"use client";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "../lib/apolloClient";
import PokemonSearchBar from "../components/PokemonSearchBar";
import PokemonSortBar from "../components/PokemonSortBar";
import PokemonGrid from "../components/PokemonGrid";
import { useState, useMemo } from "react";

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

function PokemonsPageContent() {
  const [pageSize, setPageSize] = useState(20);
  const { data, loading, error, refetch } = useQuery(GET_POKEMONS, {
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
      .filter((p: any) => {
        // Name filter
        if (filters.name && !p.name.toLowerCase().includes(filters.name.toLowerCase())) {
          return false;
        }

        // Height range filter
        if (filters.minHeight && p.height < parseFloat(filters.minHeight)) {
          return false;
        }
        if (filters.maxHeight && p.height > parseFloat(filters.maxHeight)) {
          return false;
        }

        // Weight range filter
        if (filters.minWeight && p.weight < parseFloat(filters.minWeight)) {
          return false;
        }
        if (filters.maxWeight && p.weight > parseFloat(filters.maxWeight)) {
          return false;
        }

        return true;
      })
      .map((p: any) => ({
        ...p,
        number: p.id,
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
