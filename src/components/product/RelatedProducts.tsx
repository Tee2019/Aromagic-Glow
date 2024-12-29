import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="cursor-pointer group"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="aspect-square mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg group-hover:opacity-75 transition-opacity"
            />
          </div>
          <h3 className="font-medium group-hover:text-purple-600">{product.name}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}