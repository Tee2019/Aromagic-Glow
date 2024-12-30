import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { wishlistService } from '../services/wishlist.service';
import { useAuthContext } from './AuthContext';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      setItems([]);
    }
  }, [user]);

  const loadWishlist = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const wishlistItems = await wishlistService.getWishlist();
      setItems(wishlistItems);
    } catch (err: any) {
      console.error('Error loading wishlist:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (product: Product) => {
    if (!user) {
      throw new Error('Please log in to add items to your wishlist');
    }

    try {
      setError(null);
      const updatedWishlist = await wishlistService.addToWishlist(product._id);
      setItems(updatedWishlist);
    } catch (err: any) {
      console.error('Error adding to wishlist:', err);
      throw err;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) {
      throw new Error('Please log in to manage your wishlist');
    }

    try {
      setError(null);
      const updatedWishlist = await wishlistService.removeFromWishlist(productId);
      setItems(updatedWishlist);
    } catch (err: any) {
      console.error('Error removing from wishlist:', err);
      throw err;
    }
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isLoading, error }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlistContext must be used within a WishlistProvider');
  }
  return context;
}