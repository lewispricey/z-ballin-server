import db from "../connection";

const createTables = async () => {
  try {
    await db.query(`CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    await db.query(`CREATE TABLE accounts (
      account_id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
      account_name VARCHAR(255) NOT NULL,
      account_type VARCHAR(255) NOT NULL,
      balance DECIMAL(10, 2) NOT NULL
    );`);

    await db.query(`CREATE TABLE categories (
      category_id SERIAL PRIMARY KEY,
      category_name VARCHAR(255) NOT NULL,
      isExpense BOOLEAN NOT NULL
    );`);

    await db.query(`CREATE TABLE transactions (
      transaction_id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
      account_id INTEGER REFERENCES accounts(account_id) ON DELETE CASCADE,
      isExpense BOOLEAN NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      date DATE NOT NULL,
      description VARCHAR(255),
      category_id INTEGER REFERENCES categories(category_id)
    );`);

    console.log("Created Tables ✅");
  } catch (error) {
    console.log(`
  Error Creating Tables ❌
  ${error}`);
  }
};

export default createTables;
