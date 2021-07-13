const mongoose = require("mongoose");

const AdressShema = new mongoose.Schema(
  {
    street_address: {
      type: String,
    },
    subdivision: {
      type: String,
    },
    postal_code: {
      type: Number,
    },
    locality: {
      type: String,
    },
    country: {
        type: String,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Adress", AdressShema);
