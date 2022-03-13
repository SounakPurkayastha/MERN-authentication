const errorHandler = (err, req, res, next) => {
  if (err.code === 11000)
    return res.status(400).send({ message: "Email id already exists" });
  res.status(err.statusCode || 500).send({
    message: err.message || "Server error",
  });
};

module.exports = errorHandler;
