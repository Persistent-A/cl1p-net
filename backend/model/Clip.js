const mongoose = require("mongoose");

const clipSchema = new mongoose.Schema(
  {
    urlExtension: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      index: { expireAfterSeconds: 0 },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clip", clipSchema);
