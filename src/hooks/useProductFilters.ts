import { useState, useMemo } from 'react';
import { Product } from '../types';
import { SortOption } from '../components/browse/SortDropdown';

export function useProductFilters(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const filteredAndSortedProducts = useMemo(() => {
    // First, filter products based on search query
    let result = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Then, sort the filtered products
    switch (sortOption) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price);
      default:
        return result;
    }
  }, [products, searchQuery, sortOption]);

  return {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    filteredAndSortedProducts
  };
}