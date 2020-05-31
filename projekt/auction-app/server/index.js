const express = require("express");
const passport = require("passport");
require("./config/database-config");
require("./config/passport-config.js");
const auctionsRouter = require("./routes/api/auctionRoutes.js");
const usersRouter = require("./routes/api/userRoutes.js");

/**
 * -------------- GENERAL SETUP ----------------
 */
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

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
