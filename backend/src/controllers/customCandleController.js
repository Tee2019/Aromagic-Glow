import CustomCandle from '../models/CustomCandle.js';

export const createCustomCandle = async (req, res) => {
  try {
    const { size, container, scents, color, message, basePrice } = req.body;
    
    const customCandle = await CustomCandle.create({
      user: req.user._id,
      size,
      container,
      scents,
      color,
      message,
      basePrice,
      finalPrice: basePrice // Will be calculated in pre-save hook
    });

    res.status(201).json(customCandle);
  } catch (error) {
    console.error('Error creating custom candle:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getUserCustomCandles = async (req, res) => {
  try {
    const customCandles = await CustomCandle.find({ user: req.user._id })
      .sort('-createdAt');
    res.json(customCandles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomCandleById = async (req, res) => {
  try {
    const customCandle = await CustomCandle.findById(req.params.id);
    if (customCandle && customCandle.user.toString() === req.user._id.toString()) {
      res.json(customCandle);
    } else {
      res.status(404).json({ message: 'Custom candle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};