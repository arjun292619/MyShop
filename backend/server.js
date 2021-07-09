import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';

//internal modules & middleware
import connectDB from './config/db.js';
import errorHandler from './middleware/error.js';
import ErrorResponse from './utils/errorResponse.js';

//load environment variables
dotenv.config({ path: './backend/config/config.env' });

//Route Modules
import productRoutes from './routes/products.js';

//connect to MongoDB
connectDB();

const app = express();

//logging req information
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//req json parser
app.use(express.json());

//Mount Routers
app.use('/api/products', productRoutes);

//page not found error
app.use((req, res, next) => {
  return next(new ErrorResponse(`Page ${req.originalUrl} not found`, 404));
});

//error Handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//listen on server
app.listen(PORT, () => {
  console.log(
    `Backend Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .yellow.bold
  );
});
