const mongoose = require("mongoose");

const AttribuatedShema = new mongoose.Schema(
  {
    has_received_object: {
      type: String,
    },
    date_reception: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attribuated", AttribuatedShema);
