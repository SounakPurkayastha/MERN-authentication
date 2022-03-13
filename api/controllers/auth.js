const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.registerController = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    res.send({ token: generateToken(user.id) });
  } catch (err) {
    next(err);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).send({ message: "Invalid email or password" });
    const valid = await user.checkPassword(req.body.password);
    if (valid) res.send({ token: generateToken(user.id) });
    else res.status(404).send({ message: "Invalid email or password" });
  } catch (err) {
    next(err);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
