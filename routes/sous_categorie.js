const router = require("express").Router();
const SousCategorie = require("../model/Sous_categorie");

//Create a SousCategorie
router.post("/", async (req, res) => {
    const newSousCategorie = new SousCategorie(req.body);
    try {
      const savedSousCategorie = await newSousCategorie.save();
      res.status(200).json(savedSousCategorie);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //Update a SousCategorie
  router.put("/:id", async (req, res) => {
    try {
      const updateSousCategorie = await SousCategorie.findById(req.params.id);
      if (updateSousCategorie._id == req.body.id) {
        await updateSousCategorie.updateOne({ $set: req.body });
        res.status(200).json("The SousCategorie has been updated");
      } else {
        res.status(403).json("You can update only your SousCategorie");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //Delete a SousCategorie
  router.delete("/:id", async (req, res) => {
    try {
      const deleteSousCategorie = await SousCategorie.findById(req.params.id);
      if (deleteSousCategorie._id == req.body.id) {
        await deleteSousCategorie.deleteOne();
        res.status(200).json("The SousCategorie has been deleted");
      } else {
        res.status(403).json("You can delete only your SousCategorie");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get all SousCategorie
  router.get("/", async (req, res) => {
    try {
      const findAllSousCategoriees = await SousCategorie.find();
      console.log(findAllSousCategoriees)
      res.status(200).json(findAllSousCategoriees);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //get one SousCategorie
  router.get("/:id", async (req, res) => {
    try {
      const findSousCategorie = await SousCategorie.findById(req.params.id);
      if (findSousCategorie != null) {
        res.status(200).json(findSousCategorie);
      } else {
        res.status(403).json("cant find this SousCategorie");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
