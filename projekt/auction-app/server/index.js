const express = require("express");
const passport = require("passport");
require("./config/database-config");
require("./config/passport-config.js");
const auctionsRouter = require("./routes/api/auctionRoutes.js");
const usersRouter = require("./routes/api/userRoutes.js");
const authenticationRouter = require("./routes/api/authenticationRoutes");
const flash = require("connect-flash");
const session = require("express-session");
const https = require("https");
const socketio = require("socket.io");
const Auction = require("./models/auctionModel");
const Message = require("./models/messageModel");
const chatRouter = require("./routes/api/chatRoutes");
const mongoose = require("mongoose");
const fs = require("fs");

/**
 * -------------- GENERAL SETUP ----------------
 */
const path = require("path");
const publicDirectoryPath = path.join(__dirname, "../dist");
const app = express();
app.use(express.static(publicDirectoryPath));
const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.APP_SECRET));
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(flash());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
const MongoStore = require("connect-mongo")(session);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */
app.use(auctionsRouter);
app.use(usersRouter);
app.use(authenticationRouter);
app.use(chatRouter);

/**
 * -------------- HTTPS ----------------
 */
const privateKey = fs.readFileSync("./server/https/key.pem");
const certificate = fs.readFileSync("./server/https/certificate.pem");
const credentials = { key: privateKey, cert: certificate };
const server = https.createServer(credentials, app);

/**
 * -------------- SOCKET.IO ----------------
 */
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
});
const passportSocketIo = require("passport.socketio");
const io = require("socket.io")(server);
io.use(
  passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: "session.sid-key",
    secret: process.env.APP_SECRET,
    store: sessionStore,
  })
);
io.on("connection", (socket) => {
  console.log("user connected!");
  socket.on("privateChat", (data) => {
    for (let i = 1; i < Object.keys(socket.rooms).length; i++) {
      socket.leave(socket.rooms[Object.keys(socket.rooms)[i]]);
    }
    socket.join([data.sender, data.receiver].sort().join(""));
    console.log(socket.rooms);
  });
  socket.on("privateMsg", (data) => {
    const message = new Message({
      _id: new mongoose.Types.ObjectId(),
      from: data.from,
      to: data.to,
      sent: new Date().getDate(),
      message: data.msg,
    });
    message
      .save()
      .then((result) => {
        io.sockets
          .in([result.from, result.to].sort().join(""))
          .emit("msg", result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  socket.on("joinLiveBid", (data) => {
    for (let i = 1; i < Object.keys(socket.rooms).length; i++) {
      socket.leave(socket.rooms[Object.keys(socket.rooms)[i]]);
    }
    socket.join(data.auctionId);
    console.log(socket.rooms);
  });
  socket.on("watchLiveBid", (data) => {
    socket.join(data.auctionId);
    console.log("watching: " + data.auctionId);
  });
  socket.on("newBid", (data) => {
    console.log("newBid");
    Auction.findOne({ _id: data.auctionId })
      .exec()
      .then((result) => {
        data.bidPrice = Math.round(data.bidPrice * 100) / 100;
        if (data.bidPrice > result.highestBid) {
          console.log(new Date(result.ends));
          if (new Date(result.ends).getTime() < new Date().getTime()) {
            result.isActive = false;
            result.buyer = result.highestBidder;
            result.save();
          } else {
            if (!result.bidders.includes(data.bidder)) {
              result.bidders.push(data.bidder);
            }
            result.highestBid = data.bidPrice;
            result.highestBidder = data.bidder;
            result.save().then(() => {
              io.sockets.in(result._id).emit("bid", {
                highestBid: result.highestBid,
                _id: result._id,
              });
            });
          }
        }
      });
  });
});

/**
 * -------------- SERVER ----------------
 */

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
