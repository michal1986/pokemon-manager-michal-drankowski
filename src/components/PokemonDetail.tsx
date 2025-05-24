import Image from "next/image";

const typeColors: Record<string, string> = {
  Fire: "bg-orange-500",
  Water: "bg-blue-500",
  Ground: "bg-yellow-600",
  Rock: "bg-yellow-800",
  Grass: "bg-green-500",
  Electric: "bg-yellow-400",
  Psychic: "bg-purple-500",
  Ice: "bg-blue-300",
  Dragon: "bg-indigo-600",
  Dark: "bg-gray-800",
  Fairy: "bg-pink-400",
  Normal: "bg-gray-500",
  Fighting: "bg-red-600",
  Flying: "bg-sky-400",
  Poison: "bg-purple-600",
  Ghost: "bg-purple-800",
  Bug: "bg-green-600",
  Steel: "bg-gray-400",
};

export default function PokemonDetail({ pokemon }: { pokemon: any }) {
  const imageSrc = `/${pokemon.name.toLowerCase()}.png`;

  return (
    <div className="flex flex-col md:flex-row mt-10">
      <div className="flex-1 flex justify-center">
        <Image
          src={imageSrc}
          alt={pokemon.name}
          width={256}
          height={256}
          className="w-64 h-64 object-contain"
        />
      </div>
      <div className="flex-1 px-8">
        <h1 className="text-3xl font-bold mb-2">{pokemon.name}</h1>
        <p className="text-gray-700 mb-4">{pokemon.description}</p>
        
        <div className="bg-blue-100 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="block text-xs text-gray-500">Height</span>
              <span className="font-bold">{pokemon.height} cm</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Weight</span>
              <span className="font-bold">{pokemon.weight} kg</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Gender</span>
              <span className="font-bold">{pokemon.gender}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Level</span>
              <span className="font-bold">{pokemon.level}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <span className="font-bold block mb-2">Type:</span>
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type: string) => (
              <span
                key={type}
                className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${typeColors[type] || "bg-gray-400"}`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <span className="font-bold block mb-2">Abilities:</span>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability: string) => (
              <span
                key={ability}
                className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800"
              >
                {ability}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="font-bold block mb-2">Weaknesses:</span>
          <div className="flex flex-wrap gap-2">
            {pokemon.weaknesses.map((weak: string) => (
              <span
                key={weak}
                className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${typeColors[weak] || "bg-gray-400"}`}
              >
                {weak}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 