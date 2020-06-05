const express = require("express");
const mongoose = require("mongoose");
const Message = require("../../models/messageModel");

const router = express.Router();

router.get("/chat/:firstUsername/:secondUsername", (req, res) => {
  const firstUsername = req.params.firstUsername;
  const secondUsername = req.params.secondUsername;
  if (!req.isAuthenticated() || req.user.username !== firstUsername) {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    Message.find()
      .or([
        { from: firstUsername, to: secondUsername },
        { from: secondUsername, to: firstUsername },
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
  if (!req.isAuthenticated() || req.user.username !== username) {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    Message.find()
      .or([{ from: username }, { to: username }])
      .exec()
      .then((result) => {
        let recipients = [];
        console.log(result);
        result.forEach((e) => {
          console.log(e);
          if (e.from === username && !recipients.includes(e.to)) {
            recipients.push(e.to);
          } else if (e.to === username && !recipients.includes(e.from)) {
            recipients.push(e.from);
          }
        });
        console.log(recipients);
        res.status(200).json(recipients);
      });
  }
});

module.exports = router;
