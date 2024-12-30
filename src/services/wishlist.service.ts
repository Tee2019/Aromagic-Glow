import api from './api';
import { Product } from '../types';

export const wishlistService = {
  async getWishlist(): Promise<Product[]> {
    try {
      const { data } = await api.get<Product[]>('/api/wishlist');
      return Array.isArray(data) ? data : [];
    } catch (error: any) {
      console.error('Get wishlist error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch wishlist');
    }
  },

  async addToWishlist(productId: string): Promise<Product[]> {
    try {
      const { data } = await api.post<Product[]>(`/api/wishlist/${productId}`);
      return Array.isArray(data) ? data : [];
    } catch (error: any) {
      console.error('Add to wishlist error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to add to wishlist');
    }
  },

  async removeFromWishlist(productId: string): Promise<Product[]> {
    try {
      const { data } = await api.delete<Product[]>(`/api/wishlist/${productId}`);
      return Array.isArray(data) ? data : [];
    } catch (error: any) {
      console.error('Remove from wishlist error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to remove from wishlist');
    }
  }
};