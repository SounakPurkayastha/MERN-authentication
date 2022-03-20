require("dotenv").config({ path: "../.env" });
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/error");
const cors = require("cors");
const protect = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.use(cors());

connectDB();

app.get("/secret", protect, (req, res) => {
  res.send({ message: "Hello," + req.user.username });
});

app.listen(process.env.PORT_NUMBER);
