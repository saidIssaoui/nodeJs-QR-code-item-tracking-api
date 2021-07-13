const router = require("express").Router();
const Facture = require("../model/Facture");

//Create a Facture
router.post("/", async (req, res) => {
    const newFacture = new Facture(req.body);
    try {
      const savedFacture = await newFacture.save();
      res.status(200).json(savedFacture);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //Update a Facture
  router.put("/:id", async (req, res) => {
    try {
      const updateFacture = await Facture.findById(req.params.id);
      if (updateFacture._id == req.body.id) {
        await updateFacture.updateOne({ $set: req.body });
        res.status(200).json("The Facture has been updated");
      } else {
        res.status(403).json("You can update only your Facture");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //Delete a Facture
  router.delete("/:id", async (req, res) => {
    try {
      const deleteFacture = await Facture.findById(req.params.id);
      if (deleteFacture._id == req.body.id) {
        await deleteFacture.deleteOne();
        res.status(200).json("The Facture has been deleted");
      } else {
        res.status(403).json("You can delete only your Facture");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get all Facture
  router.get("/", async (req, res) => {
    try {
      const findAllFacturees = await Facture.find();
      console.log(findAllFacturees)
      res.status(200).json(findAllFacturees);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //get one Facture
  router.get("/:id", async (req, res) => {
    try {
      const findFacture = await Facture.findById(req.params.id);
      if (findFacture != null) {
        res.status(200).json(findFacture);
      } else {
        res.status(403).json("cant find this Facture");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


module.exports = router;
