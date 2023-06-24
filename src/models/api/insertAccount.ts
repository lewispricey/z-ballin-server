import db from "../../db/connection";

type NewAccount = {
  accountName: string;
  accountType: string;
  balance: number;
};

const insertAccount = (userId: number, newAccount: NewAccount) => {
  const newAccountDetails = [
    userId,
    newAccount.accountName,
    newAccount.accountType,
    newAccount.balance,
  ];
  return db
    .query(
      `
      INSERT INTO accounts
      (user_id, account_name, account_type, balance)
      VALUES
      ($1, $2, $3, $4)
      RETURNING *;
      `,
      newAccountDetails
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

export default insertAccount;
