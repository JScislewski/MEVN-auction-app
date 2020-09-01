require("dotenv").config();
const express = require("express");

const fs = require("fs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const connectMongo = require("connect-mongo");
const path = require("path");
const https = require("https");
const http = require("http");
const socketIo = require("socket.io");
const passportSocketIo = require("passport.socketio");

const mongoose = require("./config/database-config");
const passport = require("./config/passport-config.js");

const auctionsRouter = require("./routers/auctionRouter.js");
const authenticationRouter = require("./routers/authenticationRouter");
const chatRouter = require("./routers/chatRouter");
const usersRouter = require("./routers/userRouter.js");

const app = express();

app.use(cookieParser(process.env.SECRET));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const MongoStore = connectMongo(session);
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
});
app.use(
  session({
    store: sessionStore,
    key: "session.sid-key",
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

/**
 * -------------- VUE ----------------
 */

const publicDirectoryPath = path.join(__dirname, "../dist");
app.use(express.static(publicDirectoryPath));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */

app.use("/api/auctions", auctionsRouter);

app.use("/api/authentication", authenticationRouter);

app.use("/api/chat", chatRouter);

app.use("/api/users", usersRouter);

/**
 * -------------- HTTPS ----------------
 */
const server = https.createServer(
  {
    key: fs.readFileSync("./server/https/key.pem"),
    cert: fs.readFileSync("./server/https/certificate.pem"),
  },
  app
);

/**
 * -------------- SOCKET.IO ----------------
 */

const io = socketIo(server);
io.use(
  passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: "session.sid-key",
    secret: process.env.SECRET,
    store: sessionStore,
  })
);
require("./socketio/socketio")(io);
/**
 * -------------- SERVER ----------------
 */
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log("Server is up on port:", port);
});
