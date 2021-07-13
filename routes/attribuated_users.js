const router = require("express").Router();
const Attribuated_users = require("../model/Attribuated_users");

//Create a Attribuated_users
router.post("/", async (req, res) => {
    const newAttribuated_users = new Attribuated_users(req.body);
    try {
      const savedAttribuated_users = await newAttribuated_users.save();
      res.status(200).json(savedAttribuated_users);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//Update a Attribuated_users
router.put("/:id", async (req, res) => {
    try {
      const attribuated_users = await Attribuated_users.findById(req.params.id);
      if (attribuated_users._id == req.body.id) {
        await attribuated_users.updateOne({ $set: req.body });
        res.status(200).json("The Attribuated_users has been updated");
      } else {
        res.status(403).json("You can update only your Attribuated_users");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
//Delete a Attribuated_users
router.delete("/:id", async (req, res) => {
    try {
      const attribuated_users = await Attribuated_users.findById(req.params.id);
      if (attribuated_users._id == req.body.id) {
        await attribuated_users.deleteOne();
        res.status(200).json("The Attribuated_users has been deleted");
      } else {
        res.status(403).json("You can delete only your Attribuated_users");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get all Attribuated_users
router.get("/", async (req, res) => {
    try {
      const findAllAttribuated_userses = await Attribuated_users.find();
      console.log(findAllAttribuated_userses)
      res.status(200).json(findAllAttribuated_userses);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//get one Attribuated_users
router.get("/:id", async (req, res) => {
    try {
      const findAttribuated_users = await Attribuated_users.findById(req.params.id);
      if (findAttribuated_users != null) {
        res.status(200).json(findAttribuated_users);
      } else {
        res.status(403).json("cant find this Attribuated_users");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
