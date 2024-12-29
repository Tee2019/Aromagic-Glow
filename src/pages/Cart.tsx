import React, { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartContext } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total } = useCartContext();
  const [error, setError] = useState<string | null>(null);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    try {
      setError(null);
      await updateQuantity(productId, newQuantity);
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      setError(null);
      await removeFromCart(productId);
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Browse our collection to add some magical scents to your cart!</p>
        <Link
          to="/browse"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700"
        >
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow mb-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
              
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.productId, Math.max(0, item.quantity - 1))}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={() => handleRemoveItem(item.productId)}
                className="text-red-500 hover:text-red-600"
                aria-label="Remove item"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 font-semibold">
              <div className="flex justify-between">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}