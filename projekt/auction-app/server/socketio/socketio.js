const Message = require("../api/models/message");
const Auction = require("../api/models/auction");
const mongoose = require("mongoose");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected!");
    socket.on("privateChat", (data) => {
      for (let i = 1; i < Object.keys(socket.rooms).length; i++) {
        socket.leave(socket.rooms[Object.keys(socket.rooms)[i]]);
      }
      socket.join([data.from, data.to].sort().join(""));
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
};
