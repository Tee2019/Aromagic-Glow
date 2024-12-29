import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { customCandleValidator } from '../utils/validators.js';
import {
  createCustomCandle,
  getUserCustomCandles,
  getCustomCandleById
} from '../controllers/customCandleController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(customCandleValidator, validate, createCustomCandle)
  .get(getUserCustomCandles);

router.route('/:id')
  .get(getCustomCandleById);

export default router;