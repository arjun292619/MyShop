import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

//json text files
import products from './data/products.js';
import users from './data/user.js';

//models
import userModel from './models/User.js';
import productModel from './models/Product.js';
import orderModel from './models/Order.js';

//database connection
import connectDB from './config/db.js';

dotenv.config({ path: './backend/config/config.env' });

connectDB();

const importData = async () => {
  try {
    await userModel.deleteMany();
    await productModel.deleteMany();
    await orderModel.deleteMany();

    const createdUsers = await userModel.create(users);

    //getting the admin user id
    const adminUser = createdUsers[0]._id;

    //adding admin user id to products json file since admin user is required field
    const updatedProducts = products.map((product) => {
      const updatedProduct = { ...product, user: adminUser };
      return updatedProduct;
    });

    await productModel.create(updatedProducts);

    console.log(`Data imported to DB...`.green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const purgeData = async () => {
  try {
    await userModel.deleteMany();
    await productModel.deleteMany();
    await orderModel.deleteMany();
    console.log(`data purged from DB...`.magenta.inverse);
    process.exit(0);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  purgeData();
} else if (process.argv[2] === '-i') {
  importData();
}
