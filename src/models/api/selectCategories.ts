import db from "../../db/connection";

const selectCategories = (isExpense: boolean) => {
  return db
    .query(
      `
      SELECT * FROM categories
      WHERE isexpense = $1;
      `,
      [isExpense]
    )
    .then(({ rows }) => {
      return rows;
    });
};

export default selectCategories;
