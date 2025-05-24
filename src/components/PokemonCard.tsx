"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const typeColors: Record<string, string> = {
  Grass: "bg-green-500",
  Poison: "bg-purple-500",
  Fire: "bg-orange-500",
  Water: "bg-blue-500",
  Flying: "bg-sky-400",
  Electric: "bg-yellow-400",
  Psychic: "bg-purple-500",
  Ice: "bg-blue-300",
  Dragon: "bg-indigo-600",
  Dark: "bg-gray-800",
  Fairy: "bg-pink-400",
  Normal: "bg-gray-500",
  Fighting: "bg-red-600",
  Ground: "bg-yellow-600",
  Rock: "bg-yellow-800",
  Ghost: "bg-purple-800",
  Bug: "bg-green-600",
  Steel: "bg-gray-400",
};

export default function PokemonCard({
  pokemon,
}: {
  pokemon: {
    id: number;
    name: string;
    number: number;
    types: string[];
  };
}) {
  const router = useRouter();
  const imageSrc = `/${pokemon.name.toLowerCase()}.png`;

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => router.push(`/pokemon/${pokemon.id}`)}
      tabIndex={0}
      role="button"
      onKeyDown={e => { if (e.key === 'Enter') router.push(`/pokemon/${pokemon.id}`); }}
    >
      <Image
        src={imageSrc}
        alt={pokemon.name}
        width={96}
        height={96}
        className="w-24 h-24 object-contain"
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