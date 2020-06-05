const express = require("express");
const mongoose = require("mongoose");
const Message = require("../../models/messageModel");

const router = express.Router();

router.get("/chat/:user/:user2", (req, res) => {
  const username = req.params.user;
  const username2 = req.params.user2;
  if (!req.isAuthenticated() || req.user.username !== username) {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    Message.find()
      .or([
        { from: username, to: username2 },
        { from: username2, to: username },
      ])
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
});

router.get("/chat/:user", (req, res) => {
  const username = req.params.user;
  console.log(username);
  if (!req.isAuthenticated()) {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    Message.find()
      .or([{ from: username }, { to: username }])
      .exec()
      .then((result) => {
        let recipients = [];
        result.forEach((e) => {
          if (e.from === username && !recipients.includes(e.to)) {
            recipients.push(e.to);
          } else if (e.to === username && !recipients.includes(e.from)) {
            recipients.push(e.from);
          }
        });
        res.status(200).json(recipients);
      });
  }
});

module.exports = router;
