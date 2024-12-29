import api from './api';
import { Product } from '../types';

export const productService = {
  async getProducts(params?: { category?: string; search?: string }): Promise<Product[]> {
    try {
      const { data } = await api.get<Product[]>('/api/products', { params });
      return data;
    } catch (error: any) {
      console.error('Error fetching products:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to load products');
    }
  },

  async getBestsellers(): Promise<Product[]> {
    try {
      const { data } = await api.get<Product[]>('/api/products/bestsellers');
      return data;
    } catch (error: any) {
      console.error('Error fetching bestsellers:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to load bestsellers');
    }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const { data } = await api.get<Product>(`/api/products/${id}`);
      return data;
    } catch (error: any) {
      console.error('Error fetching product:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to load product');
    }
  }
};