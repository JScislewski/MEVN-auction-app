const Message = require("../models/messageModel");
const Auction = require("../models/auctionModel");
const mongoose = require("mongoose");

let bidQueue = {};

const queueBid = data => {
  console.log("queued");
  if (Array.isArray(bidQueue[data.auctionId])) {
    bidQueue[data.auctionId].push(data);
  } else {
    bidQueue[data.auctionId] = [data];
  }
  console.log(bidQueue[data.auctionId]);
};

const resolveQueue = (auctionId, io) => {
  console.log("resolving");
  if (bidQueue[auctionId].length > 0) {
    console.log("resolving with next in queue");
    bid(bidQueue[auctionId][0], io);
  } else {
    console.log("queue empty");
  }
};

const bid = (data, io) => {
  console.log(`bidding with:`);
  console.log(data);
  Auction.findOne({ _id: data.auctionId })
    .exec()
    .then(result => {
      data.bidPrice = Math.round(data.bidPrice * 100) / 100;
      if (data.bidPrice > result.highestBid && result.isActive) {
        if (new Date(result.endsDate).getTime() < new Date().getTime()) {
          result.isActive = false;
          result.buyerName = result.highestBidder;
          result.save().then(() => {
            io.sockets.in(result._id).emit("sold");
          });
        } else {
          if (!result.bidders.includes(data.bidder)) {
            result.bidders.push(data.bidder);
          }
          result.highestBid = data.bidPrice;
          result.highestBidder = data.bidder;
          result
            .save()
            .then(() => {
              console.log("success");
              io.sockets.in(result._id).emit("bid", {
                highestBid: result.highestBid,
                highestBidder: result.highestBidder,
                _id: result._id
              });
              resolveQueue(data.auctionId, io);
            })
            .catch(err => {
              console.log(err);
              bidQueue[data.auctionId].shift();
            });
        }
      }
    })
    .catch(err => {
      console.log(err);
      bidQueue[data.auctionId].shift();
    });
  bidQueue[data.auctionId].shift();
};

module.exports = io => {
  io.on("connection", socket => {
    console.log("user connected!");
    socket.on("privateChat", data => {
      console.log(`${data.from} joined private chat with ${data.to}`);
      for (let i = 1; i < Object.keys(socket.rooms).length; i++) {
        socket.leave(socket.rooms[Object.keys(socket.rooms)[i]]);
      }
      socket.join([data.from, data.to].sort().join(""));
    });
    socket.on("privateMsg", data => {
      const message = new Message({
        _id: new mongoose.Types.ObjectId(),
        from: data.from,
        to: data.to,
        sent: new Date().getDate(),
        message: data.msg
      });
      message
        .save()
        .then(result => {
          console.log(result);
          io.sockets
            .in([result.from, result.to].sort().join(""))
            .emit("msg", result);
        })
        .catch(err => {
          console.log(err);
        });
    });
    socket.on("joinLiveBid", data => {
      for (let i = 1; i < Object.keys(socket.rooms).length; i++) {
        socket.leave(socket.rooms[Object.keys(socket.rooms)[i]]);
      }
      socket.join(data.auctionId);
    });
    socket.on("watchLiveBid", data => {
      socket.join(data.auctionId);
    });
    socket.on("newBid", data => {
      queueBid(data);
      if (bidQueue[data.auctionId].length === 1) {
        bid(data, io);
      }
      /*    Auction.findOne({ _id: data.auctionId })
        .exec()
        .then(result => {
          data.bidPrice = Math.round(data.bidPrice * 100) / 100;
          if (data.bidPrice > result.highestBid) {
            if (new Date(result.ends).getTime() < new Date().getTime()) {
              result.isActive = false;
              result.buyer = result.highestBidder;
              result.save().then(() => {
                io.sockets.in(result._id).emit("sold");
              });
            } else {
              if (!result.bidders.includes(data.bidder)) {
                result.bidders.push(data.bidder);
              }
              result.highestBid = data.bidPrice;
              result.highestBidder = data.bidder;
              result.save().then(() => {
                io.sockets.in(result._id).emit("bid", {
                  highestBid: result.highestBid,
                  _id: result._id
                });
              });
            }
          }
        });*/
    });
  });
};
