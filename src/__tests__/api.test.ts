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
  });
});
