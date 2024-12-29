import React from 'react';
import { useWishlistContext } from '../contexts/WishlistContext';
import { useCartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlistContext();
  const { addToCart } = useCartContext();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-gray-600 mb-8">Save your favorite items to your wishlist!</p>
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
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onAddToWishlist={removeFromWishlist}
          />
        ))}
      </div>
    </div>
  );
}