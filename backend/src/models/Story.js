const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    hnId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      default: "",
      trim: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      default: "unknown",
      trim: true,
    },
    postedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);