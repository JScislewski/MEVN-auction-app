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
    .expect(400);
});
