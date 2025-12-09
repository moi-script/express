// 1. A route that simulates a crash

app.get('/risky-route', (req, res, next) => {
  const err = new Error('Database connection failed!');
  err.statusCode = 500;
  next(err); // Pass the error down the chain
});

// 2. The Safety Net (Must have 4 arguments)
const globalErrorHandler = (err, req, res, next) => {
  console.error('🚨 Alert:', err.message); // Log for the developer

  const status = err.statusCode || 500;
  
  res.status(status).json({
    status: 'error',
    message: 'Something went wrong, please try again later.'
    // Note: We deliberately do NOT send err.stack to the user for security
  });
};

// Usage: Must be the LAST app.use() in your file
app.use(globalErrorHandler);