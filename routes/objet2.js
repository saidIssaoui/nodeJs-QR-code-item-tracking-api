const router = require("express").Router();
const Objet = require("../model/Objet");

//get item by userId
router.post("/", async (req, res) => {
  const objetNew = req.body.userId
  console.log(req.body)
  try {
    const findAllObjetes = await Objet.find({userId: objetNew });
    res.status(200).json(findAllObjetes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
