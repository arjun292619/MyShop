import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/User.js';

// @desc get all user
// @route GET /api/admin/users
// @access Private/Admin only
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, count: users.length, data: users });
});

// @desc get user by id
// @route GET /api/admin/users/:id
// @access Private/Admin only
export const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId).select('+password');
  if (!user) {
    new ErrorResponse(`No user with id ${req.user._id} exists`, 400);
  }

  return res.status(200).json({ success: true, data: user });
});

// @desc edit user by id
// @route PUT /api/admin/users/:id
// @access Private/Admin only
export const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    new ErrorResponse(`No user with id ${req.user._id} exists`, 400);
  }

  const { name, email, isAdmin, role } = req.body;

  user.name = name || user.name;
  user.email = email || user.email;
  user.isAdmin = isAdmin ? isAdmin : false;
  user.role = role ? role : 'user';

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      role: updatedUser.role,
    },
  });
});

// @desc delete user by id
// @route DELETE /api/admin/users/:id
// @access Private/Admin only
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`No user with id ${req.user._id} exists`, 400)
    );
  }

  await user.remove();

  return res.status(200).json({ success: true, data: {} });
});
