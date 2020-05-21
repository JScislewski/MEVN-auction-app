const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auctionsRouter = require("./routes/api/auctionsRoutes.js");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set('useFindAndModify', false);
mongoose.connect(
  "mongodb+srv://auctionuser:auctionuser@cluster0-vk8ez.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(auctionsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
