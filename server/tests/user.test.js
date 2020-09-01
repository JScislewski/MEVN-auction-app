/* eslint-disable no-undef */
const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = require("../app");
const User = require("../models/user");
const { userOneId, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should display all users", async () => {
  await request(app)
    .get("/users")
    .expect(200)
    .then((response) => {
      expect(response.body.length).toBe(2);
    });
});

test("Should find user by id", async () => {
  await request(app)
    .get(`/users/${userOneId}`)
    .expect(200)
    .then((response) => {
      expect(response.body.name).toBe("Jan");
    });
});

test("Should signup a new user", async () => {
  const oldUsersCount = await User.countDocuments();
  await request(app)
    .post("/users")
    .send({
      name: "Henryk",
      password: "MyPass777!",
    })
    .expect(201);
  const newUsersCount = await User.countDocuments();
  expect(newUsersCount).toBe(oldUsersCount + 1);
});

test("Should throw duplicate name error", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Jan",
      password: "superhaslo123",
    })
    .expect(400)
    .then((response) => {
      expect(response.body.code).toBe(11000);
    });
});

test("Should throw too short password password", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "janusz",
      password: "pass",
    })
    .expect(400)
    .then((response) => {
      expect(response.body.errors.password.message).toBe(
        "The password must have a least 7 characters."
      );
    });
});

test("Should encrypt password", async () => {
  const id = new mongoose.Types.ObjectId();
  await request(app)
    .post("/users")
    .send({
      _id: id,
      name: "janusz",
      password: "mypassword",
    })
    .expect(201);
  const user = await User.findOne(id);
  const isMatch = await bcrypt.compare("mypassword", user.password);
  expect(isMatch).toBe(true);
});
