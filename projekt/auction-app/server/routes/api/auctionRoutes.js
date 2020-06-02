const express = require("express");
const auctionModel = require("../../models/auctionModel.js");
const app = express();

app.get("/auctions/all/:amount", (req, res) => {
  let amount = 5;
  if (req.params.amount) {
    amount = req.params.amount;
  }
  console.log(amount);
  auctionModel
    .find({ isActive: true })
    .limit(parseInt(amount))
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

app.get("/auctions", async (req, res) => {
  const auctions = await auctionModel.find({});
  try {
    res.send(auctions);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/auctions/:auctionId", (req, res) => {
  const id = req.params.auctionId;
  auctionModel
    .findOne({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
app.post("/auctions", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    const auction = new auctionModel({
      name: req.body.title,
      sellerName: req.user.username,
      description: req.body.description,
      buyoutPrice: req.body.buyoutPrice,
      startingBid: req.body.startingBid,
      highestBid: req.body.startingBid,
      ends: req.body.ends,
      isActive: true,
    });
    let errors = [];
    if (!auction.name || auction.name.length <= 2) {
      errors.push("Title needs to be longer than 2 letters.");
    }
    if (auction.description <= 5) {
      auction.errors.push("Please describe the object you are selling.");
    }

    if (
      (isNaN(auction.buyoutPrice) || auction.buyoutPrice <= 0) &&
      (isNaN(auction.startingBid) || auction.startingBid <= 0)
    ) {
      errors.push("Price has to be greater than 0.");
    }

    if (
      auction.startingBid &&
      new Date(auction.ends).getTime() <= new Date().getTime()
    ) {
      errors.push("Auction has to end in the future :).");
    }
    if (errors.length === 0) {
      auction
        .save()
        .then((result) => {
          res.status(201).json({
            message: "Successfully created an auction",
            auction: auction,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    } else {
      console.log(errors);
      res.status(400).json({
        errors: errors,
      });
    }
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
