const express = require("express");
const Auction = require("../models/auctionModel.js");
const router = express.Router();

const checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    return next();
  }
};

const validateAuction = (auction) => {
  let errors = [];
  if (!auction.name || auction.name.length <= 2) {
    errors.push("Too short name.");
  }
  if (auction.description <= 5) {
    auction.errors.push("Too short description");
  }

  if (
    (isNaN(auction.buyoutPrice) || auction.buyoutPrice <= 0) &&
    (isNaN(auction.startingBid) || auction.startingBid <= 0)
  ) {
    errors.push("Starting price must be greater than 0.");
  }

  if (
    auction.startingBid &&
    new Date(auction.ends).getTime() <= new Date().getTime()
  ) {
    errors.push("Enter proper date.");
  }
  return errors;
};

router.get("/all/:page", (req, res) => {
  let pageSize = 3;
  let page = 1;
  if (req.params.page) {
    page = req.params.page;
  }
  Auction.find({ isActive: true })
    .sort({ startDate: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
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
      .sort({ startDate: -1 })
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
router.get("/my-bids", checkAuth, (req, res) => {
  Auction.find({ bidders: req.user.username, isActive: true })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
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
      name: req.body.name,
      sellerName: req.user.username,
      description: req.body.description,
      buyoutPrice: req.body.buyoutPrice,
      startingBid: req.body.startingBid,
      highestBid: req.body.startingBid,
      endsDate: req.body.endsDate,
      startDate: new Date(),
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
router.patch("/:auctionId", checkAuth, (req, res) => {
  const id = req.params.auctionId;
  const auction = req.body;
  let errors = validateAuction(auction);
  if (errors.length === 0) {
    Auction.findOne({ _id: id })
      .exec()
      .then((result) => {
        result.name = auction.name;
        result.description = auction.description;
        result.buyoutPrice = auction.buyoutPrice;
        result.startingBid = auction.startingBid;
        result.highestBid = auction.startingBid;
        result.ends = auction.ends;
        result
          .save()
          .then(() => {
            res.status(200).json({
              msg: "Success",
            });
          })
          .catch((err) => {
            console.log(err);
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
router.delete("/:auctionId", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    const id = req.params.auctionId;
    Auction.findOne({ _id: id, sellerName: req.user.username })
      .exec()
      .then((result) => {
        if (result) {
          if (result.isActive) {
            if (result.highestBid <= result.startingBid) {
              result.delete().then(() => {
                res.status(200).json({
                  message: "Auction deleted: " + id,
                });
              });
            } else {
              res.status(400).json({
                message: "400 Auction already started",
              });
            }
          } else {
            res.status(400).json({
              message: "400 Auction already ended",
            });
          }
        } else {
          res.status(404).json({
            message: "404 Auction not found",
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
