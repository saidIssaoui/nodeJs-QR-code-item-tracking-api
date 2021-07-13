const router = require("express").Router();
const User = require("../model/Utilisateur");
const bcrypt = require("bcrypt");
//Register
router.post("/register", async (req, res) => {
  try {
    //generate crypted password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      mot_de_passe: hashedPassword,
    });
    //save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");
console.log(user)
    const validePassword = await bcrypt.compare(
      req.body.mot_de_passe,
      user.mot_de_passe
    );
    !validePassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
