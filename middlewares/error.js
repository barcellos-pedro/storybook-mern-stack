/**
 * Custom error handler
 */
function errorHandler(err, req, res, next) {
  // Deletage to the default express error handler
  // when headers have already been sent to the client
  if (err.headersSent) {
    return next(err);
  }

  const { message, stack } = err;
  const statusCode = res.statusCode || 500;
  res.status(statusCode);

  process.env.NODE_ENV === 'production'
    ? res.json({
        message,
      })
    : res.json({
        message,
        stack,
      });
}
