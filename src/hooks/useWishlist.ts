import { useState } from 'react';
import { Product } from '../types';

export function useWishlist() {
  const [items, setItems] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setItems(current => {
      if (current.some(item => item.id === product.id)) return current;
      return [...current, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems(current => current.filter(item => item.id !== productId));
  };

  return { items, addToWishlist, removeFromWishlist };
}