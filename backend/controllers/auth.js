import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc Register User and get Token
// @routes POST /api/auth/register
// @access Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });
  const token = user.generateToken();

  res.status(201).json({ success: true, token });
});

// @desc Login User and get Token
// @routes POST /api/auth/login
// @access Public
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validation for empty input fields
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  //Check if the user exists
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid user credentials', 401));
  }

  //Verify Password
  const isAuthenticated = await user.verifyPassword(password);

  if (!isAuthenticated) {
    return next(new ErrorResponse('Invalid email or password', 401));
  }

  const token = user.generateToken();

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    },
  });
});

// @desc Get logged in user profile
// @routes GET /api/auth/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  res.status(200).json({ success: true, data: user });
});
