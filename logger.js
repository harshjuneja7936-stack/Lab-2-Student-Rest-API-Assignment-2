// Custom Logger Middleware
const logger = (req, res, next) => {
  const currentTimestamp = new Date().toISOString();
  console.log(`[${currentTimestamp}] ${req.method} ${req.originalUrl}`);
  next(); // Agle middleware ya route handler par control pass karta hai
};

module.exports = logger;