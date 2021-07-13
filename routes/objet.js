const router = require("express").Router();
const Objet = require("../model/Objet");

//Create a Objet
router.post("/", async (req, res) => {
    const newObject = new Objet(req.body);
    try {
        console.log(newObject)
      const savedObject = await newObject.save();
      res.status(200).json(savedObject);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//Update a Objet

//Delete a Objet


//get all Objet
router.get("/", async (req, res) => {
  try {
    const findAllObjetes = await Objet.find();
    res.status(200).json(findAllObjetes);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get one Objet
router.get("/:id", async (req, res) => {
  try {
    const findObjet = await Objet.findById(req.params.id);
    res.status(200).json(findObjet);
  } catch (err) {
    res.status(500).json(err);
  }
});
// //get item by userId
// router.get("/", async (req, res) => {
//   try {
//     const findAllObjetes = await Objet.find({userId: "60e45c4929c30c0684c45273" });
//     res.status(200).json(findAllObjetes);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
