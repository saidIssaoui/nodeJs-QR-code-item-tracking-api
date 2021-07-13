const router = require("express").Router();
const Historique = require("../model/Historique");

//Create a Historique
router.post("/", async (req, res) => {
    const newHistorique = new Historique(req.body);
    try {
      const savedHistorique = await newHistorique.save();
      res.status(200).json(savedHistorique);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //Update a Historique
  router.put("/:id", async (req, res) => {
    try {
      const updateHistorique = await Historique.findById(req.params.id);
      if (updateHistorique._id == req.body.id) {
        await updateHistorique.updateOne({ $set: req.body });
        res.status(200).json("The Historique has been updated");
      } else {
        res.status(403).json("You can update only your Historique");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //Delete a Historique
  router.delete("/:id", async (req, res) => {
    try {
      const deleteHistorique = await Historique.findById(req.params.id);
      if (deleteHistorique._id == req.body.id) {
        await deleteHistorique.deleteOne();
        res.status(200).json("The Historique has been deleted");
      } else {
        res.status(403).json("You can delete only your Historique");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get all Historique
  router.get("/", async (req, res) => {
    try {
      const findAllHistoriquees = await Historique.find();
      console.log(findAllHistoriquees)
      res.status(200).json(findAllHistoriquees);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //get one Historique
  router.get("/:id", async (req, res) => {
    try {
      const findHistorique = await Historique.findById(req.params.id);
      if (findHistorique != null) {
        res.status(200).json(findHistorique);
      } else {
        res.status(403).json("cant find this Historique");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
