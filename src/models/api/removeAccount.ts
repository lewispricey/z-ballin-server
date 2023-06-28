import db from "../../db/connection";

const removeAccount = (accountId: string, userId: number) => {
  return db
    .query(
      `DELETE FROM 
        accounts 
    WHERE 
        account_id = $1 AND user_id = $2
    RETURNING*;`,
      [accountId, userId]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({ code: 404, msg: "account not found" });
      }
      return;
    });
};

export default removeAccount;
