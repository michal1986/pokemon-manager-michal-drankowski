"use client";
import { useState } from "react";

export default function PokemonSortBar() {
  const [sort, setSort] = useState("lowest");

  return (
    <div className="flex items-center justify-between mt-6">
      <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-md font-semibold">
        🎲 Surprise Me!
      </button>
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 font-semibold">Sort By</span>
        <select
          className="rounded-md border-gray-300"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="lowest">Lowest Number (First)</option>
          <option value="highest">Highest Number (First)</option>
        </select>
      </div>
    </div>
  );
} 