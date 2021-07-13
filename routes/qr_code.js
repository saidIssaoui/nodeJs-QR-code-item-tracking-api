const router = require("express").Router();
const QrCode = require("../model/Qr_code");

//Create a QrCode
router.post("/", async (req, res) => {
    const newQrCode = new QrCode(req.body);
    try {
      const savedQrCode = await newQrCode.save();
      res.status(200).json(savedQrCode);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //Update a QrCode
  router.put("/:id", async (req, res) => {
    try {
      const updateQrCode = await QrCode.findById(req.params.id);
      if (updateQrCode._id == req.body.id) {
        await updateQrCode.updateOne({ $set: req.body });
        res.status(200).json("The QrCode has been updated");
      } else {
        res.status(403).json("You can update only your QrCode");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //Delete a QrCode
  router.delete("/:id", async (req, res) => {
    try {
      const deleteQrCode = await QrCode.findById(req.params.id);
      if (deleteQrCode._id == req.body.id) {
        await deleteQrCode.deleteOne();
        res.status(200).json("The QrCode has been deleted");
      } else {
        res.status(403).json("You can delete only your QrCode");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get all QrCode
  router.get("/", async (req, res) => {
    try {
      const findAllQrCodees = await QrCode.find();
      console.log(findAllQrCodees)
      res.status(200).json(findAllQrCodees);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //get one QrCode
  router.get("/:id", async (req, res) => {
    try {
      const findQrCode = await QrCode.findById(req.params.id);
      if (findQrCode != null) {
        res.status(200).json(findQrCode);
      } else {
        res.status(403).json("cant find this QrCode");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
