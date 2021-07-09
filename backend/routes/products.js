import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

const router = express.Router();

// @desc Fetch all the products
// @route GET /api/products
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const products = await Product.find();
    res
      .status(200)
      .json({ success: true, length: products.length, data: products });
  })
);

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(err);
    }

    res.status(200).json({ success: true, data: product });
  })
);

export default router;
