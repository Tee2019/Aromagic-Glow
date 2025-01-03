import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';
import { useAuthContext } from '../contexts/AuthContext';
import { useWishlistContext } from '../contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
  isInWishlist?: boolean;
}

export default function ProductCard({ product, isInWishlist = false }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const { addToWishlist, removeFromWishlist } = useWishlistContext();
  const { isAuthenticated } = useAuthContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlistUpdating, setIsWishlistUpdating] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
      setTimeout(() => {
        setShowLoginMessage(false);
        navigate('/profile');
      }, 2000);
      return;
    }

    setIsAdding(true);
    setActionError(null);
    try {
      await addToCart(product);
      setShowAddedMessage(true);
      setTimeout(() => {
        setShowAddedMessage(false);
      }, 2000);
    } catch (err: any) {
      setActionError(err.message);
      setTimeout(() => {
        setActionError(null);
      }, 3000);
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlistAction = async () => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
      setTimeout(() => {
        setShowLoginMessage(false);
        navigate('/profile');
      }, 2000);
      return;
    }

    setIsWishlistUpdating(true);
    setActionError(null);
    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product);
      }
    } catch (err: any) {
      setActionError(err.message);
      setTimeout(() => {
        setActionError(null);
      }, 3000);
    } finally {
      setIsWishlistUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="p-4 pt-0 flex justify-between">
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="relative bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
          {showAddedMessage && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm py-1 px-2 rounded">
              Added!
            </span>
          )}
          {showLoginMessage && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-sm py-1 px-2 rounded whitespace-nowrap">
              Please log in first
            </span>
          )}
          {actionError && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm py-1 px-2 rounded">
              {actionError}
            </span>
          )}
        </button>
        <button
          onClick={handleWishlistAction}
          disabled={isWishlistUpdating}
          className={`text-gray-600 hover:text-purple-600 ${isInWishlist ? 'text-purple-600' : ''} ${isWishlistUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Heart className="h-6 w-6" fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}