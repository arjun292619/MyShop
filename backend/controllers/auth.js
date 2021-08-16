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

  res.status(201).json({
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

  const user = await User.findById(userId).select('+password');

  res.status(200).json({ success: true, data: user });
});

// @desc Update user profile
// @routes PUT /api/auth/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId).select('+password');

  if (!user) {
    return next(new ErrorResponse('No user found', 400));
  }

  const { name, email, password = null } = req.body;

  user.name = name || user.name;
  user.email = email || user.email;
  if (password) {
    user.password = password;
  }
  const token = user.generateToken();

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token,
    },
  });
});
