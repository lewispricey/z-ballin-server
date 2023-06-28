import db from "../../db/connection";

const selectAccount = (accountId: string, userId: number) => {
  return db
    .query(
      `
          SELECT
  A.account_id,
  A.user_id,
  A.account_name,
  A.account_type,
  A.balance,
  (
    SELECT
      json_agg(
        json_build_object(
          'transaction_id', T.transaction_id,
          'amount', T.amount,
          'date', T.date,
          'description', T.description,
          'category_name', C.category_name
        ) ORDER BY T.date DESC
      ) FILTER (WHERE row_number <= 5)
    FROM
      (
        SELECT
          T.*,
          ROW_NUMBER() OVER (ORDER BY T.date DESC) AS row_number
        FROM
          transactions AS T
        WHERE
          T.account_id = A.account_id
      ) AS T
    LEFT JOIN
      categories AS C ON T.category_id = C.category_id
  ) AS transactions
FROM
  accounts AS A
WHERE
  A.account_id = $1 AND A.user_id = $2;
      `,
      [accountId, userId]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({ code: 404, msg: "account not found" });
      }
      return rows[0];
    });
};

export default selectAccount;
