const express = require("express");
const auctionModel = require("../../models/auction");
const app = express();

app.get("/auctions", async (req, res) => {
  const auctions = await auctionModel.find({});
  try {
    res.send(auctions);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/auction", async (req, res) => {
  const auction = new auctionModel(req.body);
  try {
    await auction.save();
    res.send(auction);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/auction/:id", async (req, res) => {
  try {
    const auction = await auctionModel.findByIdAndDelete(req.params.id);
    if (!auction) res.status(404).send("No item found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/auction/:id", async (req, res) => {
  try {
    await auctionModel.findOneAndUpdate(req.params.id, req.body, { new: true });
    await auctionModel.save();
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
