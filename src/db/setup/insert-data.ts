const format = require("pg-format");
import { Account, Category, User } from "../Types";
import db from "../connection";
import {
  AccountData,
  CategoryData,
  DataTypes,
  TransactionData,
  UserData,
} from "./data/Types";
import {
  prepareAccounts,
  prepareCategories,
  prepareTransactions,
  prepareUsers,
} from "./utils/prepareData";

const insertData = async ({
  users,
  accounts,
  categories,
  transactions,
}: DataTypes) => {
  try {
    const insertedUsers = await insertUsersData(users);
    const insertedAccounts = await insertAccountsData(accounts, insertedUsers);
    const insertedCategories = await insertCategoriesData(categories);
    await insertTransactionsData(
      transactions,
      insertedAccounts,
      insertedCategories
    );
    console.log("Seeded Data ✅");
  } catch (error) {
    console.log(`
    Error Seeding Data ❌
    ${error}`);
  }
};

const insertUsersData = async (users: UserData[]) => {
  const formattedUserData = prepareUsers(users);

  const queryString = format(
    `INSERT INTO users
      (email, password)
    VALUES
      %L
    RETURNING *;`,
    formattedUserData
  );

  const insertedUsers = await db.query(queryString);
  return insertedUsers.rows;
};

const insertAccountsData = async (
  accounts: AccountData[],
  insertedUsers: User[]
) => {
  const formattedAccountsData = prepareAccounts(accounts, insertedUsers);

  const queryString = format(
    `INSERT INTO accounts
      (user_id, account_name, account_type, balance)
    VALUES
      %L
    RETURNING *;`,
    formattedAccountsData
  );

  const insertedAccounts = await db.query(queryString);
  return insertedAccounts.rows;
};

const insertCategoriesData = async (categories: CategoryData[]) => {
  const formattedCategoryData = prepareCategories(categories);

  const queryString = format(
    `INSERT INTO categories
      (category_name, isExpense)
    VALUES
      %L
    RETURNING *;`,
    formattedCategoryData
  );

  const insertedCategories = await db.query(queryString);
  return insertedCategories.rows;
};

const insertTransactionsData = async (
  transactionsData: TransactionData[],
  insertedAccounts: Account[],
  insertedCategories: Category[]
) => {
  const formattedTransactionData = prepareTransactions(
    transactionsData,
    insertedAccounts,
    insertedCategories
  );

  const queryString = format(
    `INSERT INTO transactions
      (user_id, account_id, isExpense, amount, date, description, category_id)
    VALUES
      %L
    RETURNING *;`,
    formattedTransactionData
  );

  const insertedTransactions = await db.query(queryString);
  return insertedTransactions.rows;
};
export default insertData;
