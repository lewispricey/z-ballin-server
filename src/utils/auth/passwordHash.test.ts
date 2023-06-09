import { hashPassword, verifyPassword } from "./passwordHash";

describe("hashPassword", () => {
  test("should return a hash value for the password provided with a fixed length", async () => {
    const password = "P4ssW0RD!";

    const result = await hashPassword(password);

    expect(result).not.toBe(password);
    expect(result).toHaveLength(98);
  });
  test("should return a different hash value for the same password each time", async () => {
    const password = "P4ssW0RD!";

    const result1 = await hashPassword(password);
    const result2 = await hashPassword(password);

    expect(result1).not.toBe(result2);
  });
});

describe("verifyPassword", () => {
  test("should return false when the password does not compute to the passed hash", async () => {
    const password = "P4ssW0RD!";
    const hash =
      "$argon2id$v=19$m=65536,t=10,p=4$MZLruuAU+Y3wjR/4HDF3Hg$eHWZ0k4In5cfGth6eVA+i1CiF2e7zfekmPrSyhWpB5s";

    const result = await verifyPassword(password, hash);

    expect(result).toBe(false);
  });

  test("should return true when the passed password matches the passed hash", async () => {
    const password = "P4ssW0RD!";
    const hash =
      "$argon2id$v=19$m=65536,t=10,p=4$q6ckd212mHOGVL6Bza7ovw$YB0ZaYqeygDtnf2j2mSK1WziYPXoup+oTv5vMjjShvA";

    const result = await verifyPassword(password, hash);

    expect(result).toBe(true);
  });
});
