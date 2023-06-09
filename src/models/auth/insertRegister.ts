import db from "../../db/connection";
import { hashPassword } from "../../utils/auth/passwordHash";
import validateInputs from "../../utils/auth/validateInputs";

const insertRegister = (email: string, password: string) => {
  return validateInputs(email, password)
    .then(() => {
      return hashPassword(password);
    })
    .then((hashedPassword: string) => {
      return db.query(
        `INSERT INTO users(email, password) 
        VALUES($1, $2)
        RETURNING *;`,
        [email, hashedPassword]
      );
    });
};

export default insertRegister;
