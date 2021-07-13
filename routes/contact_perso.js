const router = require("express").Router();
const ContactPerso = require("../model/Contact_perso");

//Create a ContactPerso
router.post("/", async (req, res) => {
  const newContactPerso = new ContactPerso(req.body);
  try {
    const savedContactPerso = await newContactPerso.save();
    res.status(200).json(savedContactPerso);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update a ContactPerso
router.put("/:id", async (req, res) => {
  try {
    const updateContactPerso = await ContactPerso.findById(req.params.id);
    if (updateContactPerso._id == req.body.id) {
      await updateContactPerso.updateOne({ $set: req.body });
      res.status(200).json("The ContactPerso has been updated");
    } else {
      res.status(403).json("You can update only your ContactPerso");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete a ContactPerso
router.delete("/:id", async (req, res) => {
  try {
    const deleteContactPerso = await ContactPerso.findById(req.params.id);
    if (deleteContactPerso._id == req.body.id) {
      await deleteContactPerso.deleteOne();
      res.status(200).json("The ContactPerso has been deleted");
    } else {
      res.status(403).json("You can delete only your ContactPerso");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all ContactPerso
router.get("/", async (req, res) => {
  try {
    const findAllContactPersoes = await ContactPerso.find();
    console.log(findAllContactPersoes)
    res.status(200).json(findAllContactPersoes);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get one ContactPerso
router.get("/:id", async (req, res) => {
  try {
    const findContactPerso = await ContactPerso.findById(req.params.id);
    if (findContactPerso != null) {
      res.status(200).json(findContactPerso);
    } else {
      res.status(403).json("cant find this ContactPerso");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
