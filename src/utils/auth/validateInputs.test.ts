import { validateEmail, validatePassword } from "./validateInputs";

describe("validateEmail", () => {
  test("should return false when passed an email without an @ symbol", () => {
    const input = "testemail.com";
    const result = validateEmail(input);
    expect(result).toBe(false);
  });
  test("should return false when passed an email without a domain", () => {
    const input = "testemail1234";
    const result = validateEmail(input);
    expect(result).toBe(false);
  });
  test("should return true when passed a valid email", () => {
    const input = "testemail@email.com";
    const result = validateEmail(input);
    expect(result).toBe(true);

    const input2 = "thisisanemail@hotmail.co.uk";
    const result2 = validateEmail(input2);
    expect(result2).toBe(true);
  });
});

describe("validatePassword", () => {
  test("should return false when passed a password less than 8 charactors", () => {
    const input = "L0gin!";
    const result = validatePassword(input);
    expect(result).toBe(false);
  });
  test("should return false when passed a password missing a numeric character", () => {
    const input = "Password!";
    const result = validatePassword(input);
    expect(result).toBe(false);
  });
  test("should return false when passed a password missing a uppercase character", () => {
    const input = "passw0rd!";
    const result = validatePassword(input);
    expect(result).toBe(false);
  });
  test("should return false when passed a password missing a special character", () => {
    const input = "P4ssw0rd";
    const result = validatePassword(input);
    expect(result).toBe(false);
  });
  test("should return false when passed a password missing a lowercase character", () => {
    const input = "P4SSWORD!";
    const result = validatePassword(input);
    expect(result).toBe(false);
  });
  test("should return true when passed a vaid password", () => {
    const input = "P4ssW0RD!";
    const result = validatePassword(input);
    expect(result).toBe(true);
  });
});
