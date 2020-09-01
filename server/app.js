const express = require("express");

require("./db/mongoose");
const userRouter = require("./routers/user.js");
const auctionRouter = require("./routers/auction.js");
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(auctionRouter);

module.exports = app;
