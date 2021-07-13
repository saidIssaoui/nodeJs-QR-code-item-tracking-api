const mongoose = require("mongoose");

const CategorieShema = new mongoose.Schema(
  {
    titre: {
      type: String,
    },
    code_couleur: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categorie", CategorieShema);
