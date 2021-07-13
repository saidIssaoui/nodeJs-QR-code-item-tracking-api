const mongoose = require("mongoose");

const InfoAdminShema = new mongoose.Schema(
  {
    informations_administratifs: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InfoAdmin", InfoAdminShema);
