import api from './api';
import { Order, ShippingDetails, PaymentDetails } from '../types/order';

export const orderService = {
  async createOrder(orderData: {
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress: ShippingDetails;
    paymentMethod: string;
    totalPrice: number;
  }) {
    const { data } = await api.post('/orders', orderData);
    return data;
  },

  async getUserOrders() {
    const { data } = await api.get('/orders');
    return data;
  },

  async getOrderById(id: string) {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  }
};