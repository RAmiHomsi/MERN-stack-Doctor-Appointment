const express = require("express");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { password, name, email } = req.body;
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400).json({ msg: "User already exists" });
    }

    const userDoc = await User.create({
      name,
      email,
      password,
    });
    res.json(userDoc);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { password, email } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      res.status(404).json({ msg: "user not found" });
    }

    const isMatch = await userDoc.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "password mismatch" });
    } else {
      const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({ token: token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/userbyid", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.json("user does not exist");
    } else {
      res.status(200).json({
        data: {
          user: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
