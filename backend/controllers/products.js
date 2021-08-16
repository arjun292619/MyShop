import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

// @desc Fetch all the products
// @route GET /api/products
// @access Public
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res
    .status(200)
    .json({ success: true, length: products.length, data: products });
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(err);
  }

  res.status(200).json({ success: true, data: product });
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(err);
  }

  await product.remove();

  res.status(200).json({ success: true, data: { message: 'product removed' } });
});
