import React from 'react';
import { useWishlistContext } from '../contexts/WishlistContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { items, isLoading, error } = useWishlistContext();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Error Loading Wishlist</h1>
        <p className="text-gray-600 mb-8">{error}</p>
        <Link
          to="/browse"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700"
        >
          Browse Collection
        </Link>
      </div>
    );
  }

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
            key={product._id}
            product={product}
            isInWishlist={true}
          />
        ))}
      </div>
    </div>
  );
}