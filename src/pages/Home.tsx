import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useWishlistContext } from '../contexts/WishlistContext';
import { productService } from '../services/product.service';
import { Product } from '../types';

export default function Home() {
  const { addToWishlist } = useWishlistContext();
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getBestsellers();
        setBestsellers(data);
      } catch (err) {
        setError('Failed to load bestsellers');
        console.error('Error fetching bestsellers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen relative bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Craft Your Perfect Ambiance
            </h1>
            <p className="text-xl mb-8">Discover our collection of handcrafted scented candles</p>
            <Link
              to="/customize"
              className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Customize Your Candle
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Our Bestsellers</h2>
          <Link
            to="/browse"
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            Shop All
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bestsellers...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToWishlist={addToWishlist}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}