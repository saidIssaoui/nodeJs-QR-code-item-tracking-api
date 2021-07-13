const mongoose = require("mongoose");
const Utilisateur = require("../model/Utilisateur").schema;

const InterventionShema = new mongoose.Schema(
  {
    date_prochaine_intervention: {
      type: String,
    },
    intervention_par: {
      type: [Utilisateur],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intervention", InterventionShema);
