const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const router = express.Router();

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      res.status(409).json({
        message: "User with that username already exists",
      });
    } else {
      if (req.body.password && req.body.username) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            const newUser = new User({
              username: req.body.username,
              password: hash,
            });
            newUser
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "Successfully registered a user",
                  user: newUser,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          });
        });
      } else {
        res.status(400);
      }
    }
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err || !user) {
      console.log(err);
      res.status(401).json({
        message: "Incorrect username or password",
      });
    } else {
      console.log(user.id);
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          user: user,
        });
      });
    }
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  if (req.user) {
    req.session.destroy((err) => {
      res.status(200);
    });
    res.status(500);
  }
  res.status(401);
});

module.exports = router;
