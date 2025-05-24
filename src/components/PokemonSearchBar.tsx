"use client";
import { useState, useEffect } from "react";

interface SearchFilters {
  name: string;
  minHeight: string;
  maxHeight: string;
  minWeight: string;
  maxWeight: string;
}

interface PokemonSearchBarProps {
  onFiltersChange: (filters: SearchFilters) => void;
}

export default function PokemonSearchBar({ onFiltersChange }: PokemonSearchBarProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
  });

  const handleFilterChange = (field: keyof SearchFilters, value: string) => {
    const newFilters = {
      ...filters,
      [field]: value
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Update name filter when search input changes
  useEffect(() => {
    handleFilterChange('name', search);
  }, [search]);

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
      <div 
        className="bg-gray-700 px-6 py-2 flex items-center justify-between rounded-b-lg cursor-pointer"
        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
      >
        <span className="text-white">Show Advanced Search {isAdvancedOpen ? '▲' : '▼'}</span>
      </div>

      {isAdvancedOpen && (
        <div className="bg-gray-100 p-6 rounded-lg mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height Range (cm)
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={filters.minHeight}
                  onChange={(e) => handleFilterChange('minHeight', e.target.value)}
                  placeholder="Min"
                />
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={filters.maxHeight}
                  onChange={(e) => handleFilterChange('maxHeight', e.target.value)}
                  placeholder="Max"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight Range (kg)
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={filters.minWeight}
                  onChange={(e) => handleFilterChange('minWeight', e.target.value)}
                  placeholder="Min"
                />
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={filters.maxWeight}
                  onChange={(e) => handleFilterChange('maxWeight', e.target.value)}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => {
                const resetFilters = {
                  name: "",
                  minHeight: "",
                  maxHeight: "",
                  minWeight: "",
                  maxWeight: "",
                };
                setFilters(resetFilters);
                setSearch("");
                onFiltersChange(resetFilters);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 