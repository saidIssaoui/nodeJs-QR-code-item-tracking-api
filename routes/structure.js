const router = require("express").Router();
const Structure = require("../model/Structure");
const Residence = require("../model/Residence");
const Address = require("../model/Adress");
const ContactPro = require("../model/Contact_pro");
const Contrat_abonnement = require("../model/Contrat_abonnement");
const Informations_administratifs = require("../model/Informations_administratifs");

//Create a Structure
router.post("/", async (req, res) => {
  const newAddress = new Address(req.body.adress[0]);
  const savedAddress = await newAddress.save();
  const newContactPro = new ContactPro(req.body.contact_pro[0]);
  const savedContactPro = await newContactPro.save();
  const newContrat_abonnement = new Contrat_abonnement(req.body.adress[0]);
  const savedContrat_abonnement = await newContrat_abonnement.save();
  const newInformations_administratifs = new Informations_administratifs(
    req.body.contact_pro[0]
  );
  const savedInformations_administratifs =
    await newInformations_administratifs.save();
  const newResidence = new Residence(req.body.contact_pro[0]);
  const savedResidence = await newResidence.save();

  const newStructure = new Structure({
    type_structure: req.body.type_structure,
    adress: savedAddress._id,
    contact_pro: savedContactPro._id,
    contrat_abonnement: savedContrat_abonnement._id,
    informations_administratifs: savedInformations_administratifs._id,
    nom_commercial: req.body.nom_commercial,
    numero_siret: req.body.numero_siret,
    nombre_salarie: req.body.nombre_salarie,
    association: req.body.association,
    id_denomination_social: req.body.id_denomination_social,
    residence: savedResidence._id,
  });

  try {
    const savedStructure = await newStructure.save();
    res.status(200).json(savedStructure);
    console.log(savedStructure);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update a Structure

//Delete a Structure

//get all Structure

//get one Structure
router.get("/:id", async (req, res) => {
  try {
    const findStructure = await Structure.findById(req.params.id);
    const findAddress = await Address.findById(findStructure.adress[0]);
    const findContactPro = await ContactPro.findById(
      findStructure.contact_pro[0]
    );
    const findContrat_abonnement = await Contrat_abonnement.findById(
      findStructure.contrat_abonnement[0]
    );
    const findResidence = await Residence.findById(findStructure.residence[0]);
    const findInformations_administratifs =
      await Informations_administratifs.findById(
        findStructure.informations_administratifs[0]
      );
    const structurecombine = {findStructure,findAddress};
    console.log(structurecombine);
    if (findStructure != null) {
      res.status(200).json(findStructure);
    } else {
      res.status(403).json("cant find this Structure");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
