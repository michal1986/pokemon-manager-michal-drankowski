import PokemonCard from "./PokemonCard";
import { AdaptedPokemon } from "../app/page";

type PokemonCardData = {
  id: number;
  name: string;
  number: number;
  types: string[];
};

export default function PokemonGrid({ pokemons }: { pokemons: AdaptedPokemon[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {pokemons.map(pokemon => {
        const cardData: PokemonCardData = {
          id: pokemon.id,
          name: pokemon.name,
          number: parseInt(pokemon.number),
          types: pokemon.types
        };
        return <PokemonCard key={pokemon.number} pokemon={cardData} />;
      })}
    </div>
  );
} 