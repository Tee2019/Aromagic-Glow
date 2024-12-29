import express from 'express';
import { getProducts, getProductById, getBestsellers } from '../controllers/productController.js';

const router = express.Router();

// Get all products with optional filters
router.get('/', getProducts);

// Get bestseller products
router.get('/bestsellers', getBestsellers);

// Get single product by ID
router.get('/:id', getProductById);

export default router;