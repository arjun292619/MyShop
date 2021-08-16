import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/User.js';

export const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);
    const user = await User.findById(decodedToken.id);
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(
      new ErrorResponse(
        'Not authorized to access this route. Admins only.',
        400
      )
    );
  }
};
