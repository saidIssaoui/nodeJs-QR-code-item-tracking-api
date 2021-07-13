const mongoose = require("mongoose");

const ContactProShema = new mongoose.Schema(
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
    numero_tel_pro: {
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

module.exports = mongoose.model("ContactPro", ContactProShema);
