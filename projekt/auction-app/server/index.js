const express = require("express");
const https = require("https");
const passport = require("passport");
require("./config/database-config");
require("./config/passport-config.js");
const auctionsRouter = require("./routes/api/auctionRoutes.js");
const usersRouter = require("./routes/api/userRoutes.js");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");

/**
 * -------------- GENERAL SETUP ----------------
 */
const app = express();
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

/**
 * -------------- SERVER ----------------
 */
app.listen(port, () => console.log(`Server started on port ${port}`));
