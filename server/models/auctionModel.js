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
  isActive: {
    type: Boolean,
  },
  buyoutPrice: {
    type: Number,
  },
  buyerName: {
    type: String,
  },
  startingBid: {
    type: Number,
  },
  highestBid: {
    type: Number,
  },
  bidders: {
    type: Array,
  },
  highestBidder: {
    type: String,
  },
  oldHighestBidder: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endsDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Auction", auctionSchema);
