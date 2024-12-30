import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Create order and get user orders
router.route('/')
  .post(createOrder)
  .get(getUserOrders);

// Get specific order and update order status
router.route('/:id')
  .get(getOrderById)
  .put(updateOrderStatus);

export default router;