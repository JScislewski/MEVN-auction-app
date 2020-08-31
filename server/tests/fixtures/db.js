const mongoose = require("mongoose");

const User = require("../../models/user");

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
const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  setupDatabase,
};
