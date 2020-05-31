const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose.connect(
  "mongodb+srv://auctionuser:auctionuser@cluster0-vk8ez.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
