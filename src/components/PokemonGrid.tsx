import PokemonCard from "./PokemonCard";

export default function PokemonGrid({ pokemons }: { pokemons: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
} 