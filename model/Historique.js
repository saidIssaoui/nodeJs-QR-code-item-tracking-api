const mongoose = require("mongoose");

const HistoriqueShema = new mongoose.Schema(
  {
    date_creation: {
      type: String,
    },
    date_modification: {
      type: String,
    },
    date_archivage: {
      type: String,
    },
    date_scan: {
      type: String,
    },
    date_mise_en_service: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Historique", HistoriqueShema);
