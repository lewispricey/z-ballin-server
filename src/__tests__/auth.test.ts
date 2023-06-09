import app from "../app";
import request from "supertest";
import seedDb from "../db/setup/seed-db";
import db from "../db/connection";

beforeEach(async () => {
  await seedDb();
});

afterAll(() => db.end());

describe("/auth/register", () => {
  describe("POST", () => {
    test("201 - returns a new user confirmation upon successful registration", async () => {
      const postBody = {
        email: "testemail@ridesafe.com",
        password: "P4ssW0RD!",
      };

      const { body, status } = await request(app)
        .post("/auth/register")
        .send(postBody);

      const expectedResponse = { user: { email: "testemail@ridesafe.com" } };

      expect(status).toBe(201);
      expect(body).toEqual(expectedResponse);
    });

    test("400 - returns an error when password invalid", async () => {
      const postBody = {
        email: "testemail@ridesafe.com",
      };

      const { status, body } = await request(app)
        .post("/auth/register")
        .send(postBody);

      const expectedResponse = { msg: "account creation failed" };

      expect(status).toBe(400);
      expect(body).toEqual(expectedResponse);
    });

    test("400 - returns an error when email invalid", async () => {
      const postBody = {
        email: "ridesafe.com",
        password: "P4ssW0RD!",
      };

      const { status, body } = await request(app)
        .post("/auth/register")
        .send(postBody);

      const expectedResponse = { msg: "account creation failed" };

      expect(status).toBe(400);
      expect(body).toEqual(expectedResponse);
    });

    test("400 - returns an error when password does not meet requirements", async () => {
      const postBody = {
        email: "testemail@ridesafe.com",
        password: "password1",
      };

      const { status, body } = await request(app)
        .post("/auth/register")
        .send(postBody);

      const expectedResponse = { msg: "account creation failed" };

      expect(status).toBe(400);
      expect(body).toEqual(expectedResponse);
    });

    test("400 - returns an error when trying to reuse an email in the DB", async () => {
      const postBody = {
        email: "testemail@ridesafe.com",
        password: "P4ssW0RD!",
      };

      const response1 = await request(app)
        .post("/auth/register")
        .send(postBody);
      expect(response1.status).toBe(201);

      const { status, body } = await request(app)
        .post("/auth/register")
        .send(postBody);

      const expectedResponse = { msg: "account creation failed" };

      expect(status).toBe(400);
      expect(body).toEqual(expectedResponse);
    });
  });
});

describe("/auth/login", () => {
  describe("POST", () => {
    test("200 - returns a JWT access token upon successful login", async () => {
      const postBody = {
        email: "testuser@ridesafe.com",
        password: "isS1ANZ*#ESaRVIUgdnC9!$*",
      };

      const { status, body } = await request(app)
        .post("/auth/login")
        .send(postBody);

      expect(status).toBe(200);
      expect(body).toEqual({ token: expect.any(String) });
      expect(body.token.length > 100).toBe(true);
    });

    test("400 - returns an error when email is missing", async () => {
      const postBody = {
        password: "isS1ANZ*#ESaRVIUgdnC9!$*",
      };

      const { status, body } = await request(app)
        .post("/auth/login")
        .send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({ msg: "invalid email or password" });
    });

    test("400 - returns an error when password is missing", async () => {
      const postBody = {
        email: "notRegistered@lprice.dev",
      };

      const { status, body } = await request(app)
        .post("/auth/login")
        .send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({ msg: "invalid email or password" });
    });

    test("400 - returns an error if email isn't registered", async () => {
      const postBody = {
        email: "notRegistered@ridesafe.com",
        password: "isS1ANZ*#ESaRVIUgdnC9!$*",
      };

      const { status, body } = await request(app)
        .post("/auth/login")
        .send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({ msg: "invalid email or password" });
    });

    test("400 - returns an error if the password does not compute to the saved hash", async () => {
      const postBody = {
        email: "testuser@ridesafe.com",
        password: "P4ssW0RD!",
      };

      const { status, body } = await request(app)
        .post("/auth/login")
        .send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({ msg: "invalid email or password" });
    });
  });
});
