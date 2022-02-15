const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Pankajisagoodb$oy";

//Route 1: create a user using : POST '/api/auth/createuser'. no login required
router.post(
  "/createuser",
  body("name", "Enter a valid Name").isLength({ min: 3 }),
  body("email", "Enter a valid mail").isEmail(),
  body("password", "Password should be of length 5").isLength({ min: 5 }),
  async (req, res) => {
    let success = false;
    // if there are errors, return the bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // console.log(req.body);
    // const user = User(req.body);
    // user.save();

    try {
      // check whwether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "sorry a user with this email already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //   .then(user => res.json(user))
      //   .catch(err=>{console.log(err)
      //     res.json({error:"Please Enter a Unique value  for email", message: err.message})
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

//Route 2: authenticate a user using : POST '/api/auth/login'. no login required
router.post(
  "/login",
  body("email", "Enter a valid mail").isEmail(),
  body("password", "Password can not be blank").exists(),
  async (req, res) => {
      let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success,error: "Please try to login using correct credential." });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success,error: "Please try to login using correct credential." });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

//Route 3: Get logged in user details : POST '/api/auth/getuser'. no login required
router.post("/getuser",fetchuser,async (req, res) => {


    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);
module.exports = router;
