import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['relaxation', 'classic', 'fresh', 'seasonal', 'floral', 'fruity', 'tropical']
  },
  isBestseller: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Product = mongoose.model('Product', productSchema);