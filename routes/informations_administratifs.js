const router = require("express").Router();
const InfoAdmin = require("../model/Informations_administratifs");

//Create a InfoAdmin
router.post("/", async (req, res) => {
  const newInfoAdmin = new InfoAdmin(req.body);
  try {
    const savedInfoAdmin = await newInfoAdmin.save();
    res.status(200).json(savedInfoAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update a InfoAdmin
router.put("/:id", async (req, res) => {
  try {
    const updateInfoAdmin = await InfoAdmin.findById(req.params.id);
    if (updateInfoAdmin._id == req.body.id) {
      await updateInfoAdmin.updateOne({ $set: req.body });
      res.status(200).json("The InfoAdmin has been updated");
    } else {
      res.status(403).json("You can update only your InfoAdmin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete a InfoAdmin
router.delete("/:id", async (req, res) => {
  try {
    const deleteInfoAdmin = await InfoAdmin.findById(req.params.id);
    if (deleteInfoAdmin._id == req.body.id) {
      await deleteInfoAdmin.deleteOne();
      res.status(200).json("The InfoAdmin has been deleted");
    } else {
      res.status(403).json("You can delete only your InfoAdmin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all InfoAdmin
router.get("/", async (req, res) => {
  try {
    const findAllInfoAdmines = await InfoAdmin.find();
    console.log(findAllInfoAdmines)
    res.status(200).json(findAllInfoAdmines);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get one InfoAdmin
router.get("/:id", async (req, res) => {
  try {
    const findInfoAdmin = await InfoAdmin.findById(req.params.id);
    if (findInfoAdmin != null) {
      res.status(200).json(findInfoAdmin);
    } else {
      res.status(403).json("cant find this InfoAdmin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
