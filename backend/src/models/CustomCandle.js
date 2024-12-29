import mongoose from 'mongoose';

const customCandleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true
  },
  container: {
    type: String,
    enum: ['classic', 'modern', 'vintage'],
    required: true
  },
  scents: [{
    type: String,
    required: true
  }],
  color: {
    type: String,
    required: true,
    maxLength: 50
  },
  message: {
    type: String,
    maxLength: 100
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  finalPrice: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

// Calculate final price based on customizations
customCandleSchema.pre('save', function() {
  let price = this.basePrice;
  
  // Size adjustments
  if (this.size === 'large') price += 5;
  if (this.size === 'small') price -= 3;
  
  // Container adjustments
  if (this.container === 'modern') price += 5;
  if (this.container === 'vintage') price += 3;
  
  // Scent adjustments (first scent included in base price)
  price += (this.scents.length - 1) * 2;
  
  this.finalPrice = price;
});

const CustomCandle = mongoose.model('CustomCandle', customCandleSchema);

export default CustomCandle;