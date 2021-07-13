const mongoose = require("mongoose");
const Address = require("../model/Adress").schema;
const ContactPro = require("../model/Contact_pro").schema;
const ContratAbbonnement = require("../model/Contrat_abonnement").schema;
const InfoAdmin = require("../model/Informations_administratifs").schema;
const Residence = require("../model/Residence").schema;
const ObjectId = require('mongoose').ObjectId;

const StructureShema = new mongoose.Schema(
  {
    type_structure: {
      type: String,
    },
    adress:  [{ type: ObjectId, ref: 'Address' }],
    
    contact_pro: [{ type: ObjectId, ref: 'ContactPro' }],
    
    contrat_abonnement: [{ type: ObjectId, ref: 'ContratAbbonnement' }],
    
    informations_administratifs: [{ type: ObjectId, ref: 'InfoAdmin' }],
    
    nom_commercial: {
      type: String,
    },
    numero_siret: {
      type: Number,
    },
    nombre_salarie: {
      type: Number,
    },
    association: {
      type: String,
    },
    id_denomination_social: {
      type: String,
    },
    residence: [{ type: ObjectId, ref: 'Residence' }],
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Structure", StructureShema);
