// models/Dog.js
const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },

    status: {
      type: String,
      enum: ["available", "adopted"],
      default: "available",
      index: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    adoptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    adoptedAt: { type: Date, default: null },
    adoptMessageFromAdopter: { type: String, default: null, maxlength: 1000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dog", DogSchema);
