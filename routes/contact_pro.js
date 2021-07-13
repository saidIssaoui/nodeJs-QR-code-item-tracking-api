const router = require("express").Router();
const ContactPro = require("../model/Contact_pro");

//Create a ContactPro
router.post("/", async (req, res) => {
  const newContactPro = new ContactPro(req.body);
  try {
    const savedContactPro = await newContactPro.save();
    res.status(200).json(savedContactPro);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update a ContactPro
router.put("/:id", async (req, res) => {
  try {
    const updateContactPro = await ContactPro.findById(req.params.id);
    if (updateContactPro._id == req.body.id) {
      await updateContactPro.updateOne({ $set: req.body });
      res.status(200).json("The ContactPro has been updated");
    } else {
      res.status(403).json("You can update only your ContactPro");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete a ContactPro
router.delete("/:id", async (req, res) => {
  try {
    const deleteContactPro = await ContactPro.findById(req.params.id);
    if (deleteContactPro._id == req.body.id) {
      await deleteContactPro.deleteOne();
      res.status(200).json("The ContactPro has been deleted");
    } else {
      res.status(403).json("You can delete only your ContactPro");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all ContactPro
router.get("/", async (req, res) => {
  try {
    const findAllContactProes = await ContactPro.find();
    console.log(findAllContactProes)
    res.status(200).json(findAllContactProes);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get one ContactPro
router.get("/:id", async (req, res) => {
  try {
    const findContactPro = await ContactPro.findById(req.params.id);
    if (findContactPro != null) {
      res.status(200).json(findContactPro);
    } else {
      res.status(403).json("cant find this ContactPro");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
