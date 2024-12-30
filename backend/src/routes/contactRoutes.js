import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';
import { optionalProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply optional authentication to get user info if they're logged in
router.post('/', optionalProtect, submitContactForm);

export default router; 