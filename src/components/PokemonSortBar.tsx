"use client";
import React from 'react';

interface PokemonSortBarProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  onSortChange: (sortBy: string, direction: 'asc' | 'desc') => void;
}

const PokemonSortBar: React.FC<PokemonSortBarProps> = ({ 
  pageSize, 
  onPageSizeChange,
  onSortChange 
}) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 font-semibold">Sort By</span>
        <select 
          onChange={(e) => onSortChange(e.target.value, 'asc')}
          className="rounded-md border-gray-300"
        >
          <option value="name">Name</option>
          <option value="height">Height</option>
          <option value="weight">Weight</option>
        </select>
        <div className="flex space-x-1">
          <button
            onClick={() => onSortChange('name', 'asc')}
            className="px-2 py-1 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-l-md hover:bg-gray-50"
          >
            ↑
          </button>
          <button
            onClick={() => onSortChange('name', 'desc')}
            className="px-2 py-1 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-r-md hover:bg-gray-50"
          >
            ↓
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 font-semibold">Results per page</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-md border-gray-300"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default PokemonSortBar; 