const express = require("express");
const Auction = require("../models/auctionModel.js");
const router = express.Router();

router.get("/all/:amount", (req, res) => {
  let amount = 5;
  if (req.params.amount) {
    amount = req.params.amount;
  }
  Auction.find({ isActive: true })
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
router.get("/my-auctions", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    Auction.find({ sellerName: req.user.username })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
});

router.get("/auctions/:auctionId", (req, res) => {
  const auctionId = req.params.auctionId;
  Auction.findOne({ _id: auctionId })
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

router.post("/auctions", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    const auction = new Auction({
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

router.delete("/auctions/:id", async (req, res) => {
  try {
    const auction = await Auction.findByIdAndDelete(req.params.id);
    if (!auction) res.status(404).send("No item found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/buyout/:id", async (req, res) => {
  const auctionId = req.params.id;
  if (!req.isAuthenticated()) {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    Auction.findOne({ _id: auctionId })
      .exec()
      .then((result) => {
        if (result) {
          if (result.isActive && req.user.username !== result.sellerName) {
            result.buyerName = req.user.username;
            result.isActive = false;
            console.log(result);
            result.save().then(res.status(200).json(result));
          } else {
            res.status(400);
          }
        } else {
          res.status(404).json({
            message: "Auction not found",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
});

module.exports = router;
