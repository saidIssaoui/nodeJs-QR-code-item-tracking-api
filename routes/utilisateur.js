const router = require("express").Router();
const Utilisateur = require("../model/Utilisateur");
const bcrypt = require("bcrypt");
//Create a Utilisateur
router.post("/", async (req, res) => {
  
  try {
    //generate crypted password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new Utilisateur({
      genre: req.body.genre,
      nom: req.body.nom,
      prenom: req.body.prenom,
      statu: req.body.statu,
      departement: req.body.departement,
      type_contrat: req.body.type_contrat,
      email: req.body.email,
      phone: req.body.phone,
      image: req.body.image,
      password: hashedPassword,
    });
    //save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update a Utilisateur
router.put("/:id", async (req, res) => {
  try {
    const updateUtilisateur = await Utilisateur.findById(req.params.id);
    if (updateUtilisateur._id == req.body.id) {
      await updateUtilisateur.updateOne({ $set: req.body });
      res.status(200).json("The Utilisateur has been updated");
    } else {
      res.status(403).json("You can update only your Utilisateur");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete a Utilisateur
router.delete("/:id", async (req, res) => {
  try {
    const deleteUtilisateur = await Utilisateur.findById(req.params.id);
    if (deleteUtilisateur._id == req.body.id) {
      await deleteUtilisateur.deleteOne();
      res.status(200).json("The Utilisateur has been deleted");
    } else {
      res.status(403).json("You can delete only your Utilisateur");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all Utilisateur
router.get("/", async (req, res) => {
  try {
    const findAllUtilisateures = await Utilisateur.find();
    res.status(200).json(findAllUtilisateures);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get one Utilisateur
router.get("/:id", async (req, res) => {
  try {
    const findUtilisateur = await Utilisateur.findById(req.params.id);
    res.status(200).json(findUtilisateur);
  } catch (err) {
    res.status(500).json(err);
  }
});
//auth
router.post("/auth", async (req, res) => {
  try {
    const user = await Utilisateur.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");
     console.log(user)
    const validePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validePassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
