import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/auth.js';
import { protectRoute } from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/profile').get(protectRoute, getUserProfile);

export default router;
