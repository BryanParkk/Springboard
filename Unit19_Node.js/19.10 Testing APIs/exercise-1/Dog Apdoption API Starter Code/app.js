// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const dogRoutes = require("./routes/dogRoutes");
const { notFound, errorHandler } = require("./middlewares/error");

const app = express();

// Core middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // (9) JSON parsing

// Basic rate limit (optional hardening)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dogs", dogRoutes);

// 404 + centralized error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
