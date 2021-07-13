const mongoose = require("mongoose");
const QrCodeSchema = require("../model/Qr_code").schema;
const CategorieSchema = require("../model/Categorie").schema;
const SousCategorieSchema = require("../model/Sous_categorie").schema;
const HistoriqueSchema = require("../model/Historique").schema;
const FactureSchema = require("../model/Facture").schema;
const InterventionSchema = require("../model/Intervention").schema;
const Schema = require("mongoose").Schema;

const ObjetShema = new mongoose.Schema(
  {
    _id: {
      type: String,
      require: true,
      unique: true,
    },
    subcategorie: {
      type: String,
    },
    qrcode: {
      type: String,
    },
    categorie: {
      type: String,
    },
    currentlevels: {
      type: String,
    },
    currentavailabilities: {
      type: String,
    },
    currentprecisions: {
      type: String,
    },
    currentstates: {
      type: String,
    },
    uri: {
      type: String,
    },
    userId: {
      type: String,
    },
    currentbrands: {
      type: String,
    },
    currentfuels: {
      type: String,
    },
    currentmodels: {
      type: String,
    },
    currenttypes: {
      type: String,
    },
    currentcolors: {
      type: String,
    },
    currentsizes: {
      type: String,
    },
    currentbuildings: {
      type: String,
    },
    currentlocations: {
      type: String,
    },
    currentyears: {
      type: String,
    },
    currentunites: {
      type: String,
    },
    currentrate: {
      type: String,
    },
    rating: {
      type: Number,
    },
    day: {
      type: String,
    },
    month: {
      type: String,
    },
    year: {
      type: String,
    },
    ribbonColor: {
      type: String,
    },
    userName:{
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Objet", ObjetShema);
