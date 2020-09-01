const mongoose = require("mongoose");

const User = require("../../models/user");
const Auction = require("../../models/auction");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Jan",
  password: "supersecure123",
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "John",
  password: "asdhasjkd@",
};

const auctionOneId = new mongoose.Types.ObjectId();
const auctionOne = {
  _id: auctionOneId,
  title: "book",
  seller: userOneId,
  isBid: true,
  price: 10,
};

const auctionTwoId = new mongoose.Types.ObjectId();
const auctionTwo = {
  _id: auctionTwoId,
  title: "bike",
  seller: userTwoId,
  isBid: false,
  price: 20,
};

const auctionThreeId = new mongoose.Types.ObjectId();
const auctionThree = {
  _id: auctionThreeId,
  title: "movie",
  seller: userTwoId,
  isBid: false,
  price: 20,
  isActive: false,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Auction.deleteMany();
  await new Auction(auctionOne).save();
  await new Auction(auctionTwo).save();
  await new Auction(auctionThree).save();
  await new User(userOne).save();
  await new User(userTwo).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  auctionOne,
  setupDatabase,
};
