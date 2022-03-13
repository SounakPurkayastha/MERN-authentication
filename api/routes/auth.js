const express = require("express");
const User = require("../models/user");

const { registerController, loginController } = require("../controllers/auth");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
