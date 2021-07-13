const router = require("express").Router();
const Sizes = require("../model/Sizes");

//Create a Sizes
router.post("/", async (req, res) => {
    const newSizes = new Sizes(req.body);
    try {
      const savedSizes = await newSizes.save();
      res.status(200).json(savedSizes);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //Update a Sizes
  router.put("/:id", async (req, res) => {
    try {
      const updateSizes = await Sizes.findById(req.params.id);
      if (updateSizes._id == req.body.id) {
        await updateSizes.updateOne({ $set: req.body });
        res.status(200).json("The Sizes has been updated");
      } else {
        res.status(403).json("You can update only your Sizes");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //Delete a Sizes
  router.delete("/:id", async (req, res) => {
    try {
      const deleteSizes = await Sizes.findById(req.params.id);
      if (deleteSizes._id == req.body.id) {
        await deleteSizes.deleteOne();
        res.status(200).json("The Sizes has been deleted");
      } else {
        res.status(403).json("You can delete only your Sizes");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get all Sizes
  router.get("/", async (req, res) => {
    try {
      const findAllSizeses = await Sizes.find();
      console.log(findAllSizeses)
      res.status(200).json(findAllSizeses);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //get one Sizes
  router.get("/:id", async (req, res) => {
    try {
      const findSizes = await Sizes.findById(req.params.id);
      if (findSizes != null) {
        res.status(200).json(findSizes);
      } else {
        res.status(403).json("cant find this Sizes");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
