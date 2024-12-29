import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';
import { useAuthContext } from '../contexts/AuthContext';
import { customCandleService } from '../services/customCandle.service';
import { Alert, CircularProgress } from '@mui/material';

interface CustomizationOptions {
  size: 'small' | 'medium' | 'large';
  container: string;
  scents: string[];
  color: string;
  message: string;
}

interface ContainerOption {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function Customize() {
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const { isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [options, setOptions] = useState<CustomizationOptions>({
    size: 'medium',
    container: 'classic',
    scents: [],
    color: '',
    message: ''
  });

  const containers: ContainerOption[] = [
    { 
      id: 'classic', 
      name: 'Classic Jar', 
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1602874801007-bd36c3c86d45?auto=format&fit=crop&q=80&w=500'
    },
    { 
      id: 'modern', 
      name: 'Modern Geometric', 
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?auto=format&fit=crop&q=80&w=500'
    },
    { 
      id: 'vintage', 
      name: 'Vintage Glass', 
      price: 27.99,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=500'
    }
  ];

  const scents = [
    'Lavender', 'Vanilla', 'Sandalwood', 'Ocean Breeze',
    'Citrus', 'Pine', 'Jasmine', 'Cinnamon'
  ];

  const calculatePrice = () => {
    let price = containers.find(c => c.id === options.container)?.price || 24.99;
    
    // Size adjustments
    if (options.size === 'large') price += 5;
    if (options.size === 'small') price -= 3;
    
    // Additional scents (first one is included)
    price += (options.scents.length - 1) * 2;
    
    return price;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Please log in to create a custom candle');
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
      return;
    }

    if (options.scents.length === 0) {
      setError('Please select at least one scent');
      return;
    }

    if (!options.color) {
      setError('Please enter a color for your candle');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Create custom candle in the backend
      const customCandle = await customCandleService.createCustomCandle({
        ...options,
        basePrice: calculatePrice()
      });

      // Add to cart
      const productToAdd = {
        _id: customCandle._id,
        name: `Custom ${options.size} Candle`,
        description: `${options.container} container with ${options.scents.join(', ')} scents and ${options.color} color${options.message ? `. Message: ${options.message}` : ''}`,
        price: calculatePrice(),
        image: containers.find(c => c.id === options.container)?.image || '',
        category: 'custom',
        isBestseller: false
      };

      await addToCart(productToAdd);

      setSuccess(true);
      setTimeout(() => {
        navigate('/cart');
      }, 2000);
    } catch (err: any) {
      console.error('Error creating custom candle:', err);
      setError(err.message || 'Failed to create custom candle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Create Your Custom Candle</h1>
      
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" className="mb-4">
          Custom candle added to cart!
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Choose Size</h2>
          <div className="grid grid-cols-3 gap-4">
            {['small', 'medium', 'large'].map(size => (
              <button
                key={size}
                type="button"
                onClick={() => setOptions(prev => ({ ...prev, size: size as 'small' | 'medium' | 'large' }))}
                className={`p-4 border rounded-lg ${
                  options.size === size ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
              >
                <p className="font-medium">{size.charAt(0).toUpperCase() + size.slice(1)}</p>
                <p className="text-sm text-gray-600">
                  {size === 'small' ? '-$3.00' : size === 'large' ? '+$5.00' : 'Base Price'}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Select Container</h2>
          <div className="grid grid-cols-3 gap-4">
            {containers.map(container => (
              <button
                key={container.id}
                type="button"
                onClick={() => setOptions(prev => ({ ...prev, container: container.id }))}
                className={`p-4 border rounded-lg ${
                  options.container === container.id ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
              >
                <img 
                  src={container.image} 
                  alt={container.name} 
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <p className="font-medium">{container.name}</p>
                <p className="text-sm text-gray-600">${container.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Choose Scents (up to 3)</h2>
          <p className="text-sm text-gray-600 mb-4">First scent is included, additional scents +$2.00 each</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {scents.map(scent => (
              <button
                key={scent}
                type="button"
                onClick={() => setOptions(prev => ({
                  ...prev,
                  scents: prev.scents.includes(scent)
                    ? prev.scents.filter(s => s !== scent)
                    : prev.scents.length < 3
                    ? [...prev.scents, scent]
                    : prev.scents
                }))}
                className={`p-4 border rounded-lg ${
                  options.scents.includes(scent) ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
              >
                {scent}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Select Color</h2>
          <input
            type="text"
            value={options.color}
            onChange={(e) => setOptions(prev => ({ ...prev, color: e.target.value }))}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your desired candle color (e.g., Red, Blue, Light Pink)"
          />
          <p className="text-sm text-gray-600 mt-2">Enter any color you'd like for your candle</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Add Custom Message</h2>
          <textarea
            value={options.message}
            onChange={(e) => setOptions(prev => ({ ...prev, message: e.target.value }))}
            className="w-full p-2 border rounded-lg"
            placeholder="Optional: Add a personal message to be printed on the label (max 100 characters)"
            maxLength={100}
            rows={3}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Base Price ({options.container} container)</span>
              <span>${containers.find(c => c.id === options.container)?.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Size Adjustment ({options.size})</span>
              <span>
                {options.size === 'small' ? '-$3.00' : options.size === 'large' ? '+$5.00' : '$0.00'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Additional Scents ({Math.max(0, options.scents.length - 1)})</span>
              <span>+${(Math.max(0, options.scents.length - 1) * 2).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 font-semibold">
              <div className="flex justify-between">
                <span>Total</span>
                <span>${calculatePrice().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || options.scents.length === 0}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Add to Cart'
          )}
        </button>
      </form>
    </div>
  );
}