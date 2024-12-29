import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { products } from '../data/products';
import RelatedProducts from '../components/product/RelatedProducts';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <button
          onClick={() => navigate('/browse')}
          className="text-purple-600 hover:text-purple-700 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Browse
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate('/browse')}
        className="text-purple-600 hover:text-purple-700 flex items-center gap-2 mb-8"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Browse
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl text-purple-600">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="border-t border-b py-4">
            <h2 className="font-semibold mb-2">Product Details</h2>
            <ul className="space-y-2 text-gray-600">
              <li>Category: {product.category}</li>
              <li>Hand-poured in small batches</li>
              <li>Natural soy wax blend</li>
              <li>50-hour burn time</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
            <button
              onClick={() => addToWishlist(product)}
              className="px-6 py-3 rounded-lg border border-gray-300 hover:border-purple-600 hover:text-purple-600"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}