import db from "../connection";

const dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS profile`);
  await db.query(`DROP TABLE IF EXISTS users`);
};

const setupTables = async () => {
  await db.query(`CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        email VARCHAR(256) UNIQUE NOT NULL,
        password VARCHAR NOT NULL
        );`);
  //   await db.query(`CREATE TABLE profile(
  //     profile_id SERIAL PRIMARY KEY,
  //     user_id INT REFERENCES users(user_id),
  //     fiat_balance DECIMAL(12,2) DEFAULT 10000
  //   );`);
};

const addData = async () => {
  const userResponse = await db.query(
    `INSERT INTO users
      (email, password) 
      VALUES
      ($1, $2) 
      RETURNING*;`,
    [
      "test@lprice.dev",
      "$argon2id$v=19$m=65536,t=12,p=4$xtuHAXS+877DIrv9Viob8Q$qZWhV5oI7skCki7kcK+ZcwSZ/46631p5etD0HN6Cngg",
    ]
  );
  //   await db.query(
  //     `INSERT INTO profile(user_id)
  //       VALUES($1);`,
  //     [userResponse.rows[0].user_id]
  //   );
};

const seedDb = async () => {
  await dropTables();
  await setupTables();
  await addData();
};

export default seedDb;
