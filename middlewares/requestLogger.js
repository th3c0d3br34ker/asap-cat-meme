const requestLogger = (req, res, next) => {
  // Log the [time] [method] [path] of the incoming request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
}


module.exports = requestLogger;
