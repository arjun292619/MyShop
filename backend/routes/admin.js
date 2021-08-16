import express from 'express';
import { protectRoute, adminOnly } from '../middleware/auth.js';
import {
  getUsers,
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/admin.js';

const router = express.Router();

router.route('/').get(protectRoute, adminOnly, getUsers);

router
  .route('/:id')
  .get(protectRoute, adminOnly, getUser)
  .delete(protectRoute, adminOnly, deleteUser)
  .put(protectRoute, adminOnly, updateUser);

export default router;
