const mongoose = require("mongoose");

const ContactPerShema = new mongoose.Schema(
  {
    genre: {
      type: String,
    },
    nom: {
      type: String,
    },
    prenom: {
      type: String,
    },
    numero_tel_perso: {
      type: Number,
    },
    email_perso: {
      type: String,
    },
    url_photo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactPerso", ContactPerShema);
