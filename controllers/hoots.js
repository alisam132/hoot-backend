const express = require("express");
const verifyToken = require("../middleware/verify-token");
const Hoot = require("../models/Hoot.js");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    hoot._doc.author = req.user;
    console.log(req);
    
    res.status(201).json(hoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const hoots = await Hoot.find().populate("author");
    console.log(hoots);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
