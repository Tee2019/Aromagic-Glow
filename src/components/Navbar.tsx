import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu } from 'lucide-react';
import { useCartContext } from '../contexts/CartContext';

export default function Navbar() {
  const { itemCount } = useCartContext();

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            Aromagic Glow
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600">Home</Link>
            <Link to="/browse" className="text-gray-700 hover:text-purple-600">Browse</Link>
            <Link to="/customize" className="text-gray-700 hover:text-purple-600">Customize</Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 hover:text-purple-600 relative">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link to="/wishlist" className="text-gray-700 hover:text-purple-600">
              <Heart className="h-6 w-6" />
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-purple-600">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}