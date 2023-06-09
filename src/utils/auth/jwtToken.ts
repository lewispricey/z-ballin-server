import jsonwebtoken from "jsonwebtoken";
const ENV = process.env.NODE_ENV || "dev";
const pathToCorrectEnvFile = `${__dirname}/../../../.env.${ENV}`;

require("dotenv").config({
  path: pathToCorrectEnvFile,
});

interface User {
  user_id: number;
  email: string;
}

export const generateJwtToken = (user: User) => {
  const PRIVATE_KEY = process.env.PRIVATE_KEY;

  if (!PRIVATE_KEY) return { msg: "no encryption key found" };

  const encryptionKey = Buffer.from(PRIVATE_KEY, "base64").toString();

  const token = jsonwebtoken.sign(user, encryptionKey, {
    algorithm: "RS256",
    expiresIn: "24h",
  });

  return { token };
};
