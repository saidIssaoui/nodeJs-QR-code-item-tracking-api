const mongoose = require("mongoose");

const SousCategorieShema = new mongoose.Schema(
  {
    titre: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SousCategorie", SousCategorieShema);
