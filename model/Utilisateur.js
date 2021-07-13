const mongoose = require("mongoose");
const ContactPerso = require("../model/Contact_perso").schema;
const ContactPro = require("../model/Contact_pro").schema;
const Address = require("../model/Adress").schema;
const Structure = require("../model/Structure").schema;
require('mongoose-type-url');

const UtilisateurShema = new mongoose.Schema(
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
    statu: {
      type: String,
    },
    departement: {
      type: String,
    },
    type_contrat: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: mongoose.SchemaTypes.Url,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Utilisateur", UtilisateurShema);
