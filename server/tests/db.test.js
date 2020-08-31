/* eslint-disable no-undef */
const mongoose = require("mongoose");
require("dotenv").config();

test("Should connect to database", async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (e) {
    expect(e).toBeNull();
  }
  await mongoose.connection.close();
});
