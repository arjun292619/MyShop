import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //log error to console for Dev
  console.log(error);

  //Reference Error
  if (err.name === 'ReferenceError' || err.name === 'CastError') {
    const msg = `Resource not found`;
    error = new ErrorResponse(msg, 404);
  }

  if (err.name === 'CastError') {
    const msg = `Resource not found with id ${err.value}`;
    error = new ErrorResponse(msg, 404);
  }

  //Need to add validation error: error.name==='ValidatorError'

  //Need to add duplicate or unique field error code: 11000,

  const { statusCode, message } = error;

  res
    .status(statusCode || 500)
    .json({ success: false, message: message || 'Server Error' });
};

export default errorHandler;
