"use client";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "../lib/apolloClient";
import PokemonSearchBar from "../components/PokemonSearchBar";
import PokemonSortBar from "../components/PokemonSortBar";
import PokemonGrid from "../components/PokemonGrid";

const GET_POKEMONS = gql`
  query GetPokemons {
    pokemons {
      id
      name
      type
    }
  }
`;

function PokemonsPageContent() {
  const { data, loading, error } = useQuery(GET_POKEMONS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Adapt type to types array for the grid, and use a placeholder image
  const pokemons = data.pokemons.map((p: any) => ({
    ...p,
    number: p.id,
    types: Array.isArray(p.type) ? p.type : [p.type],
    image: "/placeholder.png", // Use a placeholder image for now
  }));

  return (
    <div className="max-w-5xl mx-auto p-4">
      <PokemonSearchBar />
      <PokemonSortBar />
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
