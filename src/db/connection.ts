import { Pool } from "pg";

const ENV: string = process.env.NODE_ENV || "dev";
const pathToCorrectEnvFile: string = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({
  path: pathToCorrectEnvFile,
});

const db = new Pool();

export default db;
