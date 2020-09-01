const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    Type: String,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  isBid: {
    type: Boolean,
    required: true,
  },
  bidders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ends: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    requierd: true,
  },
  price: {
    type: Number,
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;
