// middlewares/error.js
exports.notFound = (req, res, next) => {
  res.status(404).json({ error: "route not found" });
};

exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "internal server error" });
};
