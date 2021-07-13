const router = require("express").Router();
const Contrat = require("../model/Contrat_abonnement");

//Create a Contrat
router.post("/", async (req, res) => {
  const newContrat = new Contrat(req.body);
  try {
    const savedContrat = await newContrat.save();
    res.status(200).json(savedContrat);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update a Contrat
router.put("/:id", async (req, res) => {
  try {
    const updateContrat = await Contrat.findById(req.params.id);
    if (updateContrat._id == req.body.id) {
      await updateContrat.updateOne({ $set: req.body });
      res.status(200).json("The Contrat has been updated");
    } else {
      res.status(403).json("You can update only your Contrat");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete a Contrat
router.delete("/:id", async (req, res) => {
  try {
    const deleteContrat = await Contrat.findById(req.params.id);
    if (deleteContrat._id == req.body.id) {
      await deleteContrat.deleteOne();
      res.status(200).json("The Contrat has been deleted");
    } else {
      res.status(403).json("You can delete only your Contrat");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all Contrat
router.get("/", async (req, res) => {
  try {
    const findAllContrates = await Contrat.find();
    console.log(findAllContrates)
    res.status(200).json(findAllContrates);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get one Contrat
router.get("/:id", async (req, res) => {
  try {
    const findContrat = await Contrat.findById(req.params.id);
    if (findContrat != null) {
      res.status(200).json(findContrat);
    } else {
      res.status(403).json("cant find this Contrat");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
