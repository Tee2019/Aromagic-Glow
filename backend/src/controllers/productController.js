import { Product } from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Apply category filter if provided
    if (category) {
      query.category = category;
    }

    // Apply search filter if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort('name');
    
    if (!products) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

export const getBestsellers = async (req, res) => {
  try {
    const bestsellers = await Product.find({ isBestseller: true });
    if (!bestsellers || bestsellers.length === 0) {
      return res.status(404).json({ message: 'No bestsellers found' });
    }
    res.json(bestsellers);
  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    res.status(500).json({ message: 'Error fetching bestsellers' });
  }
};