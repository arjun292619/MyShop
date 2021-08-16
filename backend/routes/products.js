import express from 'express';
import {
  getAllProducts,
  getProductById,
  deleteProduct,
} from '../controllers/products.js';
import { protectRoute, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getAllProducts);

router
  .route('/:id')
  .get(getProductById)
  .delete(protectRoute, adminOnly, deleteProduct);

export default router;
