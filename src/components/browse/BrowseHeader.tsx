import React from 'react';
import SearchBar from './SearchBar';
import SortDropdown, { SortOption } from './SortDropdown';

interface BrowseHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
}

export default function BrowseHeader({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange
}: BrowseHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
      <div className="w-full md:w-96">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
      <div className="w-full md:w-48 ml-auto">
        <SortDropdown value={sortOption} onChange={onSortChange} />
      </div>
    </div>
  );
}