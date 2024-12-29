import api from './api';
import { Product, CartItem } from '../types';

interface CartResponse {
  items: CartItem[];
  total: number;
}

export class CartService {
  private static instance: CartService;

  private constructor() {}

  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  async getCart(): Promise<CartResponse> {
    try {
      const response = await api.get('/api/cart');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch cart';
      throw new Error(message);
    }
  }

  async addToCart(product: Product | { _id: string; name: string; description: string; price: number; image: string; category: string; isBestseller: boolean }, quantity: number = 1): Promise<CartResponse> {
    try {
      const response = await api.post('/api/cart', {
        productId: product._id,
        quantity,
        price: product.price,
        name: product.name,
        image: product.image
      });
      return response.data;
    } catch (error: any) {
      console.error('Add to cart error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Failed to add item to cart';
      throw new Error(message);
    }
  }

  async updateQuantity(productId: string, quantity: number): Promise<CartResponse> {
    try {
      const response = await api.put('/api/cart/quantity', {
        productId,
        quantity
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update quantity';
      throw new Error(message);
    }
  }

  async removeFromCart(productId: string): Promise<CartResponse> {
    try {
      const response = await api.delete(`/api/cart/${productId}`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to remove item from cart';
      throw new Error(message);
    }
  }

  async clearCart(): Promise<void> {
    try {
      await api.delete('/api/cart');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to clear cart';
      throw new Error(message);
    }
  }
} 