const router = require("express").Router();
const Address = require("../model/Adress");

//Create a address
router.post("/", async (req, res) => {
  const newAddress = new Address(req.body);
  try {
    const savedAddress = await newAddress.save();
    res.status(200).json(savedAddress);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update a address
router.put("/:id", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (address._id == req.body.id) {
      await address.updateOne({ $set: req.body });
      res.status(200).json("The address has been updated");
    } else {
      res.status(403).json("You can update only your address");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete a address
router.delete("/:id", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (address._id == req.body.id) {
      await address.deleteOne();
      res.status(200).json("The address has been deleted");
    } else {
      res.status(403).json("You can delete only your address");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all address
router.get("/", async (req, res) => {
  try {
    const findAllAddresses = await Address.find();
    console.log(findAllAddresses)
    res.status(200).json(findAllAddresses);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get one address
router.get("/:id", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (address != null) {
      res.status(200).json(address);
    } else {
      res.status(403).json("cant find this address");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
