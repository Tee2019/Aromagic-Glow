import React from 'react';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-purple-600 mr-2" />
              <p>123 Candle Street, Scent City, SC 12345</p>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-purple-600 mr-2" />
              <p>(555) 123-4567</p>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-purple-600 mr-2" />
              <p>info@aromagicglow.com</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
            <ul className="space-y-2">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}