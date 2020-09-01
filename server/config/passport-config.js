const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        done(err, false);
      }
      if (!user) {
        done(null, false, { message: "Incorrect username" });
      } else {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            done(null, user);
          } else {
            done(null, false, { message: "Incorrect password" });
          }
        });
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      done(err);
    }
    if (user) {
      done(null, {
        id: user._id,
        username: user.username,
        password: user.password,
      });
    } else {
      done({
        message: "Id not found.",
      });
    }
  });
});

module.exports = passport;
