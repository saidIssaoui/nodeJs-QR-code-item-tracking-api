const router = require("express").Router();
const Categorie = require("../model/Categorie");

//Create a Categorie
router.post("/", async (req, res) => {
    const newCategorie = new Categorie(req.body);
    try {
      const savedCategorie = await newCategorie.save();
      res.status(200).json(savedCategorie);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//Update a Categorie
router.put("/:id", async (req, res) => {
    try {
      const updateCategorie = await Categorie.findById(req.params.id);
      if (updateCategorie._id == req.body.id) {
        await updateCategorie.updateOne({ $set: req.body });
        res.status(200).json("The Categorie has been updated");
      } else {
        res.status(403).json("You can update only your Categorie");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
//Delete a Categorie
router.delete("/:id", async (req, res) => {
    try {
      const deleteCategorie = await Categorie.findById(req.params.id);
      if (deleteCategorie._id == req.body.id) {
        await deleteCategorie.deleteOne();
        res.status(200).json("The Categorie has been deleted");
      } else {
        res.status(403).json("You can delete only your Categorie");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get all Categorie
router.get("/", async (req, res) => {
    try {
      const findAllCategoriees = await Categorie.find();
      console.log(findAllCategoriees)
      res.status(200).json(findAllCategoriees);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//get one Categorie
router.get("/:id", async (req, res) => {
    try {
      const findCategorie = await Categorie.findById(req.params.id);
      if (findCategorie != null) {
        res.status(200).json(findCategorie);
      } else {
        res.status(403).json("cant find this Categorie");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
