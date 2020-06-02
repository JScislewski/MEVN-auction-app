const express = require("express");
const passport = require("passport");
require("./config/database-config");
require("./config/passport-config.js");
const auctionsRouter = require("./routes/api/auctionRoutes.js");
const usersRouter = require("./routes/api/userRoutes.js");
const authenticationRouter = require("./routes/api/authenticationRoutes");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");
const http = require ("http")

/**
 * -------------- GENERAL SETUP ----------------
 */
const app = express();
const whitelist = ["http://localhost:8080"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin||whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"+origin));
      }
    },
    credentials: true,
  })
);
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
app.use(authenticationRouter);

/**
 * -------------- SERVER ----------------
 */
const server = http.createServer(app);
app.listen(port, () => console.log(`Server started on port ${port}`));
