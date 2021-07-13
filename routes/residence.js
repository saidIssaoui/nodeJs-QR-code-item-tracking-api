const router = require("express").Router();
const Residence = require("../model/Residence");

//Create a Residence
router.post("/", async (req, res) => {
  const newResidence = new Residence(req.body);
  try {
    const savedResidence = await newResidence.save();
    res.status(200).json(savedResidence);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update a Residence
router.put("/:id", async (req, res) => {
  try {
    const updateResidence = await Residence.findById(req.params.id);
    if (updateResidence._id == req.body.id) {
      await updateResidence.updateOne({ $set: req.body });
      res.status(200).json("The Residence has been updated");
    } else {
      res.status(403).json("You can update only your Residence");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete a Residence
router.delete("/:id", async (req, res) => {
  try {
    const deleteResidence = await Residence.findById(req.params.id);
    if (deleteResidence._id == req.body.id) {
      await deleteResidence.deleteOne();
      res.status(200).json("The Residence has been deleted");
    } else {
      res.status(403).json("You can delete only your Residence");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all Residence
router.get("/", async (req, res) => {
  try {
    const findAllResidencees = await Residence.find();
    //console.log(findAllResidencees)
    res.status(200).json(findAllResidencees);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get one Residence
router.get("/:id", async (req, res) => {
  try {
    const findResidence = await Residence.findById(req.params.id);
    if (findResidence != null) {
      res.status(200).json(findResidence);
    } else {
      res.status(403).json("cant find this Residence");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
