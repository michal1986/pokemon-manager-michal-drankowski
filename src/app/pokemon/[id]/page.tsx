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
      description
      height
      weight
      gender
      image
      hp
      attack
      defense
      specialAttack
      specialDefense
      speed
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
    abilities: data.pokemon.abilities.map((a: { name: string }) => a.name),
    weaknesses: data.pokemon.weaknesses.map((w: { name: string }) => w.name),
    stats: [
      { name: "HP", value: data.pokemon.hp },
      { name: "Attack", value: data.pokemon.attack },
      { name: "Defense", value: data.pokemon.defense },
      { name: "Special Attack", value: data.pokemon.specialAttack },
      { name: "Special Defense", value: data.pokemon.specialDefense },
      { name: "Speed", value: data.pokemon.speed },
    ],
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