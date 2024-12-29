import { useState } from 'react';
import { Order, ShippingDetails, OrderItem } from '../types/order';
import { CartItem } from '../types';

export function useOrder() {
  const [currentOrder, setCurrentOrder] = useState<Partial<Order> | null>(null);

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const createOrder = (items: CartItem[], userId: string) => {
    const total = calculateTotal(items);
    const orderItems = items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    setCurrentOrder({
      id: `order-${Date.now()}`,
      userId,
      items: orderItems,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  const updateShipping = (shipping: ShippingDetails) => {
    if (!currentOrder) return;
    setCurrentOrder(prev => prev ? { ...prev, shipping } : null);
  };

  const finalizeOrder = async (): Promise<Order | null> => {
    if (!currentOrder || !currentOrder.shipping) {
      return null;
    }

    // Here you would typically make an API call to your backend
    // to create the order
    
    const finalOrder = currentOrder as Order;
    setCurrentOrder(null);
    return finalOrder;
  };

  return {
    currentOrder,
    createOrder,
    updateShipping,
    finalizeOrder
  };
}