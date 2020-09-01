/* eslint-disable no-undef */
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const Auction = require("../models/auction");
const { auctionOneId, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should display all active auctions", async () => {
  await request(app)
    .get("/")
    .expect(200)
    .then((response) => {
      expect(response.body.length).toBe(2);
    });
});
