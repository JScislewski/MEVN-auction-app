const mongoose = require("mongoose");

const AuctionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const Auction = mongoose.model("Auction", AuctionSchema);
module.exports = Auction;
