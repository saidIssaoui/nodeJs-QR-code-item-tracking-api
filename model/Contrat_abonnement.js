const mongoose = require("mongoose");

const ContratShema = new mongoose.Schema(
  {
    contrat_abonnement: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contrat", ContratShema);
