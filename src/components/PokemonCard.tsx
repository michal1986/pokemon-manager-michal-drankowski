import Image from "next/image";

const typeColors: Record<string, string> = {
  Grass: "bg-green-500",
  Poison: "bg-purple-500",
  Fire: "bg-orange-500",
  Water: "bg-blue-500",
  Flying: "bg-sky-400",
  // Add more as needed
};

export default function PokemonCard({
  pokemon,
}: {
  pokemon: {
    id: number;
    name: string;
    number: number;
    image: string;
    types: string[];
  };
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={96}
        height={96}
        className="w-24 h-24"
      />
      <span className="text-gray-400 text-xs mt-2">
        #{pokemon.number.toString().padStart(4, "0")}
      </span>
      <span className="font-bold text-lg">{pokemon.name}</span>
      <div className="flex space-x-2 mt-2">
        {pokemon.types.map(type => (
          <span
            key={type}
            className={`px-2 py-1 rounded text-xs font-semibold text-white ${typeColors[type] || "bg-gray-400"}`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
} 