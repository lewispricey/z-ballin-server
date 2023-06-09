import db from "../../db/connection";
import { generateJwtToken } from "../../utils/auth/jwtToken";
import { verifyPassword } from "../../utils/auth/passwordHash";

interface UserQuery {
  user_id: number;
  email: string;
  password: string;
}

const login = (email: string, password: string) => {
  // get hashed pass for user from db
  return db
    .query(
      `
    SELECT *
    FROM users
    WHERE email = $1
  `,
      [email]
    )
    .then(({ rows }: { rows: UserQuery[] }) => {
      if (!rows.length) {
        return Promise.reject({
          code: 400,
          msg: "invalid email or password",
        });
      } else {
        // call a function to check the hash
        return Promise.all([
          verifyPassword(password, rows[0].password),
          rows[0].user_id,
        ]);
      }
    })
    .then(([hashResult, user_id]) => {
      if (!hashResult) {
        return Promise.reject({ code: 400, msg: "invalid email or password" });
      } else {
        const user = { user_id, email };
        return generateJwtToken(user);
      }
    });
};

export default login;
