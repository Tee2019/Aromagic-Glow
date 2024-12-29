import { check } from 'express-validator';

export const customCandleValidator = [
  check('size')
    .isIn(['small', 'medium', 'large'])
    .withMessage('Invalid size selection'),
  check('container')
    .isIn(['classic', 'modern', 'vintage'])
    .withMessage('Invalid container selection'),
  check('scents')
    .isArray()
    .withMessage('Scents must be an array')
    .custom((scents) => scents.length > 0 && scents.length <= 3)
    .withMessage('Must select between 1 and 3 scents'),
  check('color')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Color must be between 1 and 50 characters'),
  check('message')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Message must be less than 100 characters')
];