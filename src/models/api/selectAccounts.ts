import db from "../../db/connection";

const selectAccounts = (userId: number) => {
  return db
    .query(
      `
        SELECT * FROM accounts
        WHERE user_id=$1
      `,
      [userId]
    )
    .then(({ rows }) => {
      return rows;
    });
};

export default selectAccounts;
