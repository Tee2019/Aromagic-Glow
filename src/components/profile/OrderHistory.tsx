import React from 'react';
import { Order } from '../../types';

interface OrderHistoryProps {
  orders: Order[];
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <p className="text-gray-600">No orders yet</p>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order._id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">Order #{order._id.slice(-6)}</h3>
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className="inline-block px-2 py-1 text-sm rounded-full bg-purple-100 text-purple-700">
              {order.status}
            </span>
          </div>
          
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}