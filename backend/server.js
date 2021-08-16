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
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import orderRoutes from './routes/orders.js';

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
app.use('/api/auth', authRoutes);
app.use('/api/admin/users', adminRoutes);
app.use('/api/orders', orderRoutes);

//page not found error
app.use((req, res, next) => {
  return next(new ErrorResponse(`Page ${req.originalUrl} not found`, 404));
});

//error Handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//listen on server
const appServer = app.listen(PORT, () => {
  console.log(
    `Backend Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .yellow.bold
  );
});

//handle Unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close the server and exit the process
  appServer.close(() => {
    console.log('Closing the app server'.red.blink);
    process.exit(1);
  });
});

process.once('SIGUSR2', function () {
  appServer.close(function () {
    console.log(`Killing the process process.pid`.red.bgWhite.blink);
    process.kill(process.pid, 'SIGUSR2');
  });
});
