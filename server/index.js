/**
 * -------------- CONFIGS ----------------
 */
require("dotenv").config();
const mongoose = require("./config/database-config");
const passport = require("./config/passport-config.js");

/**
 * -------------- GENERAL SETUP ----------------
 */
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.SECRET));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * -------------- SESSION ----------------
 */
const session = require("express-session");
const connectMongo = require("connect-mongo");
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
const path = require("path");
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
const auctionsRouter = require("./routers/auctionRouter.js");
app.use("/api/auctions", auctionsRouter);
const authenticationRouter = require("./routers/authenticationRouter");
app.use("/api/authentication", authenticationRouter);
const chatRouter = require("./routers/chatRouter");
app.use("/api/chat", chatRouter);
const usersRouter = require("./routers/userRouter.js");
app.use("/api/users", usersRouter);

/**
 * -------------- HTTPS ----------------
 */
const fs = require("fs");
const privateKey = fs.readFileSync("./server/https/key.pem");
const certificate = fs.readFileSync("./server/https/certificate.pem");
const credentials = { key: privateKey, cert: certificate };
const https = require("https");
const http = require("http");
//const server = https.createServer(credentials, app);
const server = http.createServer(app);

/**
 * -------------- SOCKET.IO ----------------
 */
const passportSocketIo = require("passport.socketio");
const socketIo = require("socket.io");
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
  console.log("Server running on port:", port);
});
