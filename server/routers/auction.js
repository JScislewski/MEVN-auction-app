const express = require("express");

const Auction = require("../models/auction");
const router = new express.Router();

router.get("/", async (req, res) => {
  try {
    const auctions = await Auction.find({ isActive: true });
    res.send(auctions);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
