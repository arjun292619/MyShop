import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/errorResponse.js';
import Order from '../models/Order.js';

// @desc Create Order
// @route POST /api/orders
// @access Private
export const createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new ErrorResponse('No Order Items', 400));
  }

  const order = await Order.create({
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    user: req.user._id,
  });

  res.status(201).json({ success: true, data: order });
});

// @desc Get Order by ID
// @route GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;

  const order = await Order.findById(orderId).populate({
    path: 'user',
    select: 'name email',
  });

  if (!order) {
    return next(err);
  }

  res.status(200).json({ success: true, data: order });
});

// @desc Get all Orders
// @route GET /api/orders
// @access Private/admin
export const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({ success: true, count: orders.length, data: orders });
});

// @desc Get Orders of Logged in user
// @route GET /api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const orders = await Order.find({ user: userId });

  res.status(200).json({ success: true, count: orders.length, data: orders });
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);

  if (!order) {
    return next(err);
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  const updatedOrder = await order.save();

  res.status(200).json({ success: true, data: updatedOrder });
});

// @desc send paypal clientId
// @route GET /api/orders/paypal
// @access Private
export const getPaypalClientId = asyncHandler((req, res, next) => {
  res.status(200).json({ success: true, data: process.env.PAYPAL_CLIENT_ID });
});
