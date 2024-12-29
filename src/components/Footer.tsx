import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold">Aromagic Glow</h3>
            <p className="mt-2 text-gray-400">Illuminate your space with custom scents</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6 hover:text-purple-400" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6 hover:text-purple-400" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-6 w-6 hover:text-purple-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <Link to="/contact" className="block mt-2 text-gray-400 hover:text-purple-400">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}