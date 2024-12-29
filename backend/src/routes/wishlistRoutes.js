import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} from '../controllers/wishlistController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getWishlist);

router.route('/:productId')
  .post(addToWishlist)
  .delete(removeFromWishlist);

export default router;