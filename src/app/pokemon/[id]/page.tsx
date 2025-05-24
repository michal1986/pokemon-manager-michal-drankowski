"use client";
import { useParams } from "next/navigation";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "../../../lib/apolloClient";
import PokemonDetail from "../../../components/PokemonDetail";
import PokemonStats from "../../../components/PokemonStats";

const GET_POKEMON = gql`
  query GetPokemon($id: Int!) {
    pokemon(id: $id) {
      id
      name
      type
      level
      trainer
    }
  }
`;

function PokemonDetailContent() {
  const params = useParams();
  const id = Number((params as { id: string }).id);
  const { data, loading, error } = useQuery(GET_POKEMON, { variables: { id } });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.pokemon) return <div className="p-8 text-center">Pokémon not found.</div>;

  const pokemon = {
    ...data.pokemon,
    number: data.pokemon.id,
    types: Array.isArray(data.pokemon.type) ? data.pokemon.type : [data.pokemon.type],
    image: `/${data.pokemon.name.toLowerCase()}.png`,
    // You can add more fields or mock them as needed for the detail component
    description: "No description available.",
    height: "?",
    weight: "?",
    gender: "?",
    abilities: [],
    weaknesses: [],
    stats: [],
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <PokemonDetail pokemon={pokemon} />
      <PokemonStats stats={pokemon.stats} />
    </div>
  );
}

export default function PokemonDetailPage() {
  return (
    <ApolloProvider client={client}>
      <PokemonDetailContent />
    </ApolloProvider>
  );
} 