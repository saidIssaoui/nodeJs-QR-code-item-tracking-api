const mongoose = require("mongoose");

const ResidenceShema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    fullName: {
      type: String,
    },
    nb_etage: {
      type: String,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    sexe: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Residence", ResidenceShema);
