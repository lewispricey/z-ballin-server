import {
  prepareAccounts,
  prepareCategories,
  prepareTransactions,
  prepareUsers,
} from "../prepareData";

describe("prepareUsers", () => {
  test("should return an empty array when passed an empy array", () => {
    const input: [] = [];
    const result = prepareUsers(input);
    expect(result).toEqual([]);
  });

  test("should return a new array", () => {
    const input = [{ email: "user@lprice.dev", password: "testpassword" }];
    const result = prepareUsers(input);
    expect(result).toBeInstanceOf(Array);
    expect(result).not.toBe(input);
  });

  test("should return an an array containing a user array with both required values in the correct order when passed a single object array", () => {
    const input = [{ email: "user@lprice.dev", password: "testpassword" }];
    const result = prepareUsers(input);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0][0]).toBe("user@lprice.dev");
    expect(result[0][1]).toBe("testpassword");
  });

  test("should return an array of arrays with both required values in order when passed an array containing multiple objects", () => {
    const input = [
      { email: "user@lprice.dev", password: "testpassword" },
      { email: "test@lprice.dev", password: "anotherpassword" },
    ];
    const result = prepareUsers(input);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    expect(result[0][0]).toBe("user@lprice.dev");
    expect(result[0][1]).toBe("testpassword");
    expect(result[1][0]).toBe("test@lprice.dev");
    expect(result[1][1]).toBe("anotherpassword");
  });

  test("should not mutate the origional input", () => {
    const input = [
      { email: "user@lprice.dev", password: "testpassword" },
      { email: "test@lprice.dev", password: "anotherpassword" },
    ];

    const inputCopy = [
      { email: "user@lprice.dev", password: "testpassword" },
      { email: "test@lprice.dev", password: "anotherpassword" },
    ];

    prepareUsers(input);

    expect(input).toEqual(inputCopy);
  });
});

describe("prepareCategories", () => {
  test("should return an empty array when passed an empy array", () => {
    const input: [] = [];
    const result = prepareCategories(input);
    expect(result).toEqual([]);
  });

  test("should return a new array", () => {
    const input = [
      {
        category_name: "bills",
        isExpense: true,
      },
    ];

    const result = prepareCategories(input);

    expect(result).toBeInstanceOf(Array);
    expect(result).not.toBe(input);
  });

  test("should return an an array containing a category array with both required values in the correct order when passed a single object array", () => {
    const input = [
      {
        category_name: "bills",
        isExpense: true,
      },
    ];
    const result = prepareCategories(input);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0][0]).toBe("bills");
    expect(result[0][1]).toBe(true);
  });

  test("should return an array of arrays with both required values in order when passed an array containing multiple objects", () => {
    const input = [
      {
        category_name: "bills",
        isExpense: true,
      },
      {
        category_name: "refund",
        isExpense: false,
      },
    ];
    const result = prepareCategories(input);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    expect(result[0][0]).toBe("bills");
    expect(result[0][1]).toBe(true);
    expect(result[1][0]).toBe("refund");
    expect(result[1][1]).toBe(false);
  });

  test("should not mutate the origional input", () => {
    const input = [
      {
        category_name: "bills",
        isExpense: true,
      },
      {
        category_name: "refund",
        isExpense: false,
      },
    ];

    const inputCopy = [
      {
        category_name: "bills",
        isExpense: true,
      },
      {
        category_name: "refund",
        isExpense: false,
      },
    ];

    prepareCategories(input);

    expect(input).toEqual(inputCopy);
  });
});

describe("prepareAccounts", () => {
  test("should return an empty array when passed an empty array", () => {
    const input: [] = [];
    const result = prepareAccounts(input, input);
    expect(result).toEqual([]);
  });

  test("should return an array containing a single object with the user_name field switched with user id", () => {
    const accountsInput = [
      {
        email: "testuser@lprice.dev",
        account_name: "my current account",
        account_type: "debit",
        balance: 1000,
      },
    ];
    const usersInput = [
      {
        user_id: 1,
        email: "testuser@lprice.dev",
        password: "fjeiofjsiods",
        created_at: "2022-01-02",
      },
    ];

    const result = prepareAccounts(accountsInput, usersInput);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);

    const expectedOutput = [[1, "my current account", "debit", 1000]];

    expect(result).toEqual(expectedOutput);
  });
  test("should return an array containing a multiple objects with the user_name field switched with user id and the remaining properties", () => {
    const accountsInput = [
      {
        email: "testuser@lprice.dev",
        account_name: "my current account",
        account_type: "debit",
        balance: 1000,
      },
      {
        email: "testuser@lprice.dev",
        account_name: "my credit card",
        account_type: "credit",
        balance: -50,
      },
      {
        email: "anothertestuser@lprice.dev",
        account_name: "curr card",
        account_type: "debit",
        balance: 100,
      },
    ];
    const usersInput = [
      {
        user_id: 1,
        email: "testuser@lprice.dev",
        password: "fjeiofjsiods",
        created_at: "2022-01-02",
      },
      {
        user_id: 2,
        email: "anothertestuser@lprice.dev",
        password: "fjeiofjsiods",
        created_at: "2022-01-02",
      },
    ];

    const result = prepareAccounts(accountsInput, usersInput);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);

    const expectedOutput = [
      [1, "my current account", "debit", 1000],
      [1, "my credit card", "credit", -50],
      [2, "curr card", "debit", 100],
    ];

    expect(result).toEqual(expectedOutput);
  });
});

describe("prepareTransactions", () => {
  test("should return an empty array when passed an empty array", () => {
    const input: [] = [];
    const result = prepareTransactions(input, input, input);
    expect(result).toEqual([]);
  });

  test("should return an array containing a single object with the user_name field switched with user id", () => {
    const transactionsInput = [
      {
        email: "testuser@lprice.dev",
        account_name: "my current account",
        isExpense: false,
        amount: 2000,
        date: "2023-06-01",
        description: "salary",
        category_name: "paycheck",
      },
    ];

    const accountsInput = [
      {
        user_id: 1,
        account_id: 1,
        account_name: "my current account",
        account_type: "debit",
        balance: 1000,
      },
    ];

    const categorysInput = [
      {
        category_id: 5,
        category_name: "paycheck",
        isExpense: false,
      },
    ];

    const result = prepareTransactions(
      transactionsInput,
      accountsInput,
      categorysInput
    );

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);

    const expectedOutput = [[1, 1, false, 2000, "2023-06-01", "salary", 5]];

    expect(result).toEqual(expectedOutput);
  });
  test("should return an array containing a single object with the user_name field switched with user id", () => {
    const transactionsInput = [
      {
        email: "testuser@lprice.dev",
        account_name: "my current account",
        isExpense: false,
        amount: 2000,
        date: "2023-06-01",
        description: "salary",
        category_name: "paycheck",
      },
      {
        email: "testuser@lprice.dev",
        account_name: "my credit card account",
        isExpense: true,
        amount: 100,
        date: "2023-06-01",
        description: "netflix",
        category_name: "subscription",
      },
    ];

    const accountsInput = [
      {
        user_id: 1,
        account_id: 1,
        account_name: "my current account",
        account_type: "debit",
        balance: 1000,
      },
      {
        user_id: 1,
        account_id: 2,
        account_name: "my credit card account",
        account_type: "credit",
        balance: -500,
      },
    ];

    const categorysInput = [
      {
        category_id: 5,
        category_name: "paycheck",
        isExpense: false,
      },
      {
        category_id: 9,
        category_name: "subscription",
        isExpense: true,
      },
    ];

    const result = prepareTransactions(
      transactionsInput,
      accountsInput,
      categorysInput
    );

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);

    const expectedOutput = [
      [1, 1, false, 2000, "2023-06-01", "salary", 5],
      [1, 2, true, 100, "2023-06-01", "netflix", 9],
    ];

    expect(result).toEqual(expectedOutput);
  });
});
