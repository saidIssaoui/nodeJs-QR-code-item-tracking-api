const mongoose = require("mongoose");

const QrCodeShema = new mongoose.Schema(
  {
    type: {
      type: String,
    },    
    date_de_generation: {
      type: String,
    },
    code: {
      type: String,
    },
    lien_url: {
      type: String,
    },
    date_reception: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QrCode", QrCodeShema);
