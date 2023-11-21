// class for status code

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // super bascially the constructor of parent class which is Error, so the message passed in super will be passed to Error
    this.statusCode = statusCode;
  }
} // So, basically instead of calling the new Error class, you can call the ErrorHandler class.. simple:}

export const errorMiddleware = (err, req, res, next) => {
  // always start the error middleware with err
  //=========================================

  // custom message if error message is not found then this should be display (Internal error)
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
