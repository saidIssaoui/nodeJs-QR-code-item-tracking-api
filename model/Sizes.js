const mongoose = require("mongoose");

const SizesShema = new mongoose.Schema(
  {
    unit: {
      type: String,
    },
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    diamter: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sizes", SizesShema);
