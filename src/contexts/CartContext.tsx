import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartService } from '../services/cart.service';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  total: number;
  addToCart: (product: Product | { _id: string; name: string; description: string; price: number; image: string; category: string; isBestseller: boolean }, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const cartService = CartService.getInstance();

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cart = await cartService.getCart();
      setItems(cart.items);
      setTotal(cart.total);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async (product: Product | { _id: string; name: string; description: string; price: number; image: string; category: string; isBestseller: boolean }, quantity: number = 1) => {
    try {
      const cart = await cartService.addToCart(product, quantity);
      setItems(cart.items);
      setTotal(cart.total);
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const cart = await cartService.removeFromCart(productId);
      setItems(cart.items);
      setTotal(cart.total);
    } catch (error) {
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const cart = await cartService.updateQuantity(productId, quantity);
      setItems(cart.items);
      setTotal(cart.total);
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setItems([]);
      setTotal(0);
    } catch (error) {
      throw error;
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount: totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};