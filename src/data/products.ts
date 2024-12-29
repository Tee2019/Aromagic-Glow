export const products = [
  {
    id: '1',
    name: 'Lavender Dreams',
    description: 'Calming lavender scent for peaceful relaxation',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602874801007-bd36c376cd23',
    category: 'relaxation',
    isBestseller: true
  },
  {
    id: '2',
    name: 'Vanilla Bean',
    description: 'Classic vanilla fragrance with warm undertones',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59',
    category: 'classic',
    isBestseller: true
  },
  {
    id: '3',
    name: 'Ocean Breeze',
    description: 'Fresh marine scent with hints of citrus',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7',
    category: 'fresh',
    isBestseller: true
  },
  {
    id: '4',
    name: 'Cinnamon Spice',
    description: 'Warm and cozy cinnamon blend',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d',
    category: 'seasonal',
    isBestseller: true
  },
  {
    id: '5',
    name: 'Fresh Linen',
    description: 'Clean and crisp linen scent',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1584736286279-4e54be4cdbe6',
    category: 'fresh'
  },
  {
    id: '6',
    name: 'Autumn Woods',
    description: 'Rich woodland scent with cedar and pine notes',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1602028279379-dabf1345df08',
    category: 'seasonal'
  },
  {
    id: '7',
    name: 'Sweet Rose',
    description: 'Delicate rose fragrance with subtle floral notes',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1587556930283-4b1724f5cd10',
    category: 'floral'
  },
  {
    id: '8',
    name: 'Coconut Paradise',
    description: 'Tropical coconut blend with vanilla undertones',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1596793503406-d90c450da9dc',
    category: 'tropical'
  },
  {
    id: '9',
    name: 'Winter Pine',
    description: 'Fresh pine scent reminiscent of winter forests',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1576438112307-461b1983d9d3',
    category: 'seasonal'
  },
  {
    id: '10',
    name: 'Citrus Burst',
    description: 'Energizing blend of orange, lemon, and grapefruit',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1482012792084-a0c3725f289f',
    category: 'fresh'
  },
  // New floral and fruity candles
  {
    id: '11',
    name: 'Peony Garden',
    description: 'Luxurious peony blooms with a touch of jasmine',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    category: 'floral'
  },
  {
    id: '12',
    name: 'Wild Berry',
    description: 'Sweet blend of strawberries, raspberries, and blackberries',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1583922146273-68f11083858e',
    category: 'fruity'
  },
  {
    id: '13',
    name: 'Jasmine Nights',
    description: 'Enchanting jasmine with subtle white tea notes',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1595159798802-1b80e5c911a1',
    category: 'floral'
  },
  {
    id: '14',
    name: 'Mango Tango',
    description: 'Tropical mango with hints of passion fruit',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1608181831718-c9ffd8728e8f',
    category: 'fruity'
  },
  {
    id: '15',
    name: 'Cherry Blossom',
    description: 'Delicate cherry blossom with soft floral undertones',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1594897030264-ab7d87efc473',
    category: 'floral'
  },
  {
    id: '16',
    name: 'Summer Peach',
    description: 'Sweet peach with hints of vanilla and honey',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1572635196184-84e35138cf62',
    category: 'fruity'
  },
  {
    id: '17',
    name: 'Lily of the Valley',
    description: 'Fresh spring lily with green notes',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1587556930775-53f461f8d88a',
    category: 'floral'
  }
];

export const bestsellers = products.filter(product => product.isBestseller);