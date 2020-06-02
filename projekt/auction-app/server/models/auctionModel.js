const mongoose = require("mongoose");

const auctionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  sellerName: {
    type: String,
    required: true,
  },
  buyoutPrice: {
    type: Number,
  },
  startingBid: {
    type: Number,
  },
  highestBid: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
  bidders: {
    type: Array,
  },
  highestBidder: {
    type: String,
  },
  buyer: {
    type: String,
  },
  ends: {
    type: Date,
  },
});

module.exports = mongoose.model("Auction", auctionSchema);
