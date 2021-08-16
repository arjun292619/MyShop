import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  getPaypalClientId,
  getMyOrders,
} from '../controllers/orders.js';
import { adminOnly, protectRoute } from '../middleware/auth.js';
const router = express.Router();

router
  .route('/')
  .post(protectRoute, createOrder)
  .get(protectRoute, adminOnly, getOrders);

router.route('/paypal').get(getPaypalClientId);

router.route('/myorders').get(protectRoute, getMyOrders);

router.route('/:id').get(getOrderById);

router.route('/:id/pay').put(protectRoute, updateOrderToPaid);

export default router;
