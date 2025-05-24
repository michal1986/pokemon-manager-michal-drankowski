"use client";
import { useState } from "react";

export default function PokemonSearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="bg-gray-800 p-6 rounded-t-lg flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <input
            className="bg-white w-full md:w-80 px-4 py-2 rounded-l-md border-none focus:ring-2 focus:ring-blue-400"
            placeholder="Name or Number"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md">
            <span className="sr-only">Search</span>
            🔍
          </button>
        </div>
        <div className="bg-green-500 text-white px-6 py-3 rounded-md mt-4 md:mt-0 md:ml-6 text-center">
          Search for a Pokémon by name or using its National Pokédex number.
        </div>
      </div>
      <div className="bg-gray-700 px-6 py-2 flex items-center justify-between rounded-b-lg">
        <span className="text-white cursor-pointer">Show Advanced Search ▼</span>
      </div>
    </div>
  );
} 