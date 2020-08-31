/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should display all users", async () => {
  await request(app)
    .get("/users")
    .expect(200)
    .then((response) => {
      expect(response.body.length).toBe(2);
    });
});
