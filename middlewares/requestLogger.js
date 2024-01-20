const requestLogger = (req, res, next) => {
  // Log the [time] [method] [path] of the incoming request
  const start = Date.now()
  res.on('finish', () => {
    const end = Date.now()
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} ${res.statusCode} ${end - start}ms`
    );
  });
  next();
};

module.exports = requestLogger;
