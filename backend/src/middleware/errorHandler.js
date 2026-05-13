export const errorHandler = (err, req, res, next) => {
  process.stderr.write(`[ERROR] ${err.stack || err.message}\n`);
  const status = err.statusCode || 500;
  const message = status === 500 ? "Error interno del servidor" : err.message;
  res.status(status).json({ message });
};
