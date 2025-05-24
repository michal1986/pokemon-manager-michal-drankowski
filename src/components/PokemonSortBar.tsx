"use client";
import { useState } from "react";

interface PokemonSortBarProps {
  onPageSizeChange: (size: number) => void;
  pageSize: number;
}

export default function PokemonSortBar({ onPageSizeChange, pageSize }: PokemonSortBarProps) {
  const [sort, setSort] = useState("lowest");

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center space-x-4">
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
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-semibold">Results per page</span>
          <select
            className="rounded-md border-gray-300"
            value={pageSize}
            onChange={e => onPageSizeChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
} 