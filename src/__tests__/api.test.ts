import app from "../app";
import request from "supertest";
import seed from "../db/setup/seed";
import data from "../db/setup/data";
import db from "../db/connection";

let token = "";

beforeAll(async () => {
  await seed(data);
  const postBody = {
    email: "testuser@lprice.dev",
    password: "isS1ANZ*#ESaRVIUgdnC9!$*",
  };

  const { body } = await request(app).post("/auth/login").send(postBody);

  token = body.token;
});

// beforeEach(async () => {
//   await seed(data);
// });

afterAll(() => db.end());

describe("/categories", () => {
  describe("GET", () => {
    test("200 - responds with an array of category objects with the isexpense property true", async () => {
      const { status, body } = await request(app)
        .get("/api/categories")
        .set({ Authorization: `Bearer ${token}` });

      const { categories } = body;
      expect(status).toBe(200);
      expect(categories).toBeInstanceOf(Array);
      expect(categories.length > 0).toBe(true);
      categories.forEach((category: any) => {
        expect(category).toHaveProperty("category_id", expect.any(Number));
        expect(category).toHaveProperty("category_name", expect.any(String));
        expect(category).toHaveProperty("isexpense", true);
      });
    });
    test("200 - responds with an array of category objects matching the isExpense query", async () => {
      const { status, body } = await request(app)
        .get("/api/categories?isExpense=false")
        .set({ Authorization: `Bearer ${token}` });

      const { categories } = body;
      expect(status).toBe(200);
      expect(categories.length > 0).toBe(true);
      categories.forEach((category: any) => {
        expect(category).toHaveProperty("category_id", expect.any(Number));
        expect(category).toHaveProperty("category_name", expect.any(String));
        expect(category).toHaveProperty("isexpense", false);
      });
    });
    test("401 - responds with unauthorised when missing a valid auth token", async () => {
      const { status, body } = await request(app).get("/api/categories");

      expect(status).toBe(401);
      expect(body.msg).toBe("Unauthorized");
    });
  });
});

describe("/accounts", () => {
  describe("GET", () => {
    test("200 - responds with an array of account objects for the logged in user", async () => {
      const { status, body } = await request(app)
        .get("/api/accounts")
        .set({ Authorization: `Bearer ${token}` });

      const { accounts } = body;
      expect(status).toBe(200);
      expect(accounts).toBeInstanceOf(Array);
      expect(accounts.length > 0).toBe(true);
      accounts.forEach((account: any) => {
        expect(account).toHaveProperty("account_id", expect.any(Number));
        expect(account).toHaveProperty("user_id", 1);
        expect(account).toHaveProperty("account_name", expect.any(String));
        expect(account).toHaveProperty("account_type", expect.any(String));
        expect(account).toHaveProperty("balance", expect.any(String));
      });
    });
    test("401 - responds with unauthorised when missing a valid auth token", async () => {
      const { status, body } = await request(app).get("/api/accounts");

      expect(status).toBe(401);
      expect(body.msg).toBe("Unauthorized");
    });
  });
  describe("POST", () => {
    test("201 - responds with the created account", async () => {
      const accountToAdd = {
        accountName: "Help To Buy ISA",
        accountType: "savings",
        balance: 1000,
      };

      const { status, body } = await request(app)
        .post("/api/accounts")
        .set({ Authorization: `Bearer ${token}` })
        .send(accountToAdd);

      const { account } = body;

      expect(status).toBe(201);
      expect(account).toHaveProperty("account_id", expect.any(Number));
      expect(account).toHaveProperty("user_id", 1);
      expect(account).toHaveProperty("account_name", "Help To Buy ISA");
      expect(account).toHaveProperty("account_type", "savings");
      expect(account).toHaveProperty("balance", "1000.00");
    });
    test("201 - ignores additional body properties", async () => {
      const accountToAdd = {
        userId: 2,
        accountName: "Credit Card",
        accountType: "credit",
        balance: 50,
      };

      const { status, body } = await request(app)
        .post("/api/accounts")
        .set({ Authorization: `Bearer ${token}` })
        .send(accountToAdd);

      const { account } = body;

      expect(status).toBe(201);
      expect(account).toHaveProperty("account_id", expect.any(Number));
      expect(account).toHaveProperty("user_id", 1);
      expect(account).toHaveProperty("account_name", "Credit Card");
      expect(account).toHaveProperty("account_type", "credit");
      expect(account).toHaveProperty("balance", "50.00");
    });
    test("400 - returns an error when request body is missing the accountName property", async () => {
      const accountToAdd = {
        accountType: "credit",
        balance: 50,
      };

      const { status, body } = await request(app)
        .post("/api/accounts")
        .set({ Authorization: `Bearer ${token}` })
        .send(accountToAdd);

      expect(status).toBe(400);
      expect(body.msg).toBe("Request is missing required properties");
    });
    test("400 - returns an error when request body is missing the accountType property", async () => {
      const accountToAdd = {
        accountName: "test",
        balance: 50,
      };

      const { status, body } = await request(app)
        .post("/api/accounts")
        .set({ Authorization: `Bearer ${token}` })
        .send(accountToAdd);

      expect(status).toBe(400);
      expect(body.msg).toBe("Request is missing required properties");
    });
    test("400 - returns an error when request body is missing the balance property", async () => {
      const accountToAdd = {
        accountName: "test",
        accountType: "credit",
      };

      const { status, body } = await request(app)
        .post("/api/accounts")
        .set({ Authorization: `Bearer ${token}` })
        .send(accountToAdd);

      expect(status).toBe(400);
      expect(body.msg).toBe("Request is missing required properties");
    });
    test("401 - responds with unauthorized when missing a vaid auth token", async () => {
      const accountToAdd = {
        accountName: "Help To Buy ISA",
        accountType: "savings",
        balance: 1000,
      };

      const { status, body } = await request(app)
        .post("/api/accounts")
        .send(accountToAdd);

      expect(status).toBe(401);
      expect(body.msg).toBe("Unauthorized");
    });
  });
});
