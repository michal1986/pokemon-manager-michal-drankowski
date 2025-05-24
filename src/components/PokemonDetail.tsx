import Image from "next/image";

const typeColors: Record<string, string> = {
  Fire: "bg-orange-500",
  Water: "bg-blue-500",
  Ground: "bg-yellow-600",
  Rock: "bg-yellow-800",
  // Add more as needed
};

export default function PokemonDetail({ pokemon }: { pokemon: any }) {
  return (
    <div className="flex flex-col md:flex-row mt-10">
      <div className="flex-1 flex justify-center">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={256}
          height={256}
          className="w-64 h-64"
        />
      </div>
      <div className="flex-1 px-8">
        <p className="text-gray-700 mb-4">{pokemon.description}</p>
        <div className="bg-blue-100 rounded-lg p-4 mb-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <span className="block text-xs text-gray-500">Height</span>
              <span className="font-bold">{pokemon.height}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Weight</span>
              <span className="font-bold">{pokemon.weight}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Gender</span>
              <span className="font-bold">{pokemon.gender}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Abilities</span>
              <span className="font-bold">{pokemon.abilities.join(", ")}</span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <span className="font-bold">Type:</span>
          {pokemon.types.map((type: string) => (
            <span
              key={type}
              className={`ml-2 px-2 py-1 rounded text-xs font-semibold text-white ${typeColors[type] || "bg-gray-400"}`}
            >
              {type}
            </span>
          ))}
        </div>
        <div>
          <span className="font-bold">Weaknesses:</span>
          {pokemon.weaknesses.map((weak: string) => (
            <span
              key={weak}
              className={`ml-2 px-2 py-1 rounded text-xs font-semibold text-white ${typeColors[weak] || "bg-gray-400"}`}
            >
              {weak}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 