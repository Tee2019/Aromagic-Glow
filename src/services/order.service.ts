import api from './api';
import { Order } from '../types';

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  phone: string;
}

export const orderService = {
  async createOrder(orderData: {
    items: Array<{ product: string; quantity: number; price: number; name: string }>;
    shippingAddress: ShippingDetails;
    paymentMethod: string;
    totalPrice: number;
  }): Promise<Order> {
    try {
      const { data } = await api.post<Order>('/api/orders', orderData);
      return data;
    } catch (error: any) {
      console.error('Create order error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  },

  async getUserOrders(): Promise<Order[]> {
    try {
      const { data } = await api.get<Order[]>('/api/orders');
      return data;
    } catch (error: any) {
      console.error('Get orders error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  },

  async getOrderById(id: string): Promise<Order> {
    try {
      const { data } = await api.get<Order>(`/api/orders/${id}`);
      return data;
    } catch (error: any) {
      console.error('Get order error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
  }
};