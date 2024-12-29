import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Lavender Dreams',
    description: 'Calming lavender scent for peaceful relaxation',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602874801007-bd36c376cd23',
    category: 'relaxation',
    isBestseller: true
  },
  {
    name: 'Vanilla Bean',
    description: 'Classic vanilla fragrance with warm undertones',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59',
    category: 'classic',
    isBestseller: true
  },
  {
    name: 'Ocean Breeze',
    description: 'Fresh marine scent with hints of citrus',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7',
    category: 'fresh',
    isBestseller: true
  },
  {
    name: 'Cinnamon Spice',
    description: 'Warm and cozy cinnamon blend',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d',
    category: 'seasonal',
    isBestseller: true
  },
  {
    name: 'Fresh Linen',
    description: 'Clean and crisp linen scent',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1584736286279-4e54be4cdbe6',
    category: 'fresh'
  },
  {
    name: 'Autumn Woods',
    description: 'Rich woodland scent with cedar and pine notes',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1602028279379-dabf1345df08',
    category: 'seasonal'
  },
  {
    name: 'Sweet Rose',
    description: 'Delicate rose fragrance with subtle floral notes',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1587556930283-4b1724f5cd10',
    category: 'floral'
  },
  {
    name: 'Coconut Paradise',
    description: 'Tropical coconut blend with vanilla undertones',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1596793503406-d90c450da9dc',
    category: 'tropical'
  },
  {
    name: 'Winter Pine',
    description: 'Fresh pine scent reminiscent of winter forests',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1576438112307-461b1983d9d3',
    category: 'seasonal'
  },
  {
    name: 'Citrus Burst',
    description: 'Energizing blend of orange, lemon, and grapefruit',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1482012792084-a0c3725f289f',
    category: 'fresh'
  },
  {
    name: 'Peony Garden',
    description: 'Luxurious peony blooms with a touch of jasmine',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    category: 'floral'
  },
  {
    name: 'Wild Berry',
    description: 'Sweet blend of strawberries, raspberries, and blackberries',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1583922146273-68f11083858e',
    category: 'fruity'
  },
  {
    name: 'Jasmine Nights',
    description: 'Enchanting jasmine with subtle white tea notes',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1595159798802-1b80e5c911a1',
    category: 'floral'
  },
  {
    name: 'Mango Tango',
    description: 'Tropical mango with hints of passion fruit',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1608181831718-c9ffd8728e8f',
    category: 'fruity'
  },
  {
    name: 'Cherry Blossom',
    description: 'Delicate cherry blossom with soft floral undertones',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1594897030264-ab7d87efc473',
    category: 'floral'
  },
  {
    name: 'Summer Peach',
    description: 'Sweet peach with hints of vanilla and honey',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1572635196184-84e35138cf62',
    category: 'fruity'
  },
  {
    name: 'Lily of the Valley',
    description: 'Fresh spring lily with green notes',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1587556930775-53f461f8d88a',
    category: 'floral'
  }
];

async function migrateProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const result = await Product.insertMany(products);
    console.log(`Successfully migrated ${result.length} products`);

    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error migrating products:', error);
    process.exit(1);
  }
}

migrateProducts(); 