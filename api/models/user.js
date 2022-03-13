const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.checkPassword = async function (password) {
  try {
    const valid = await bcrypt.compare(this.password, password);
    return valid;
  } catch (err) {
    console.log(err);
  }
};

module.exports = new mongoose.model("User", userSchema);
