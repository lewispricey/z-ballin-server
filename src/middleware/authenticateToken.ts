import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { string } from "pg-format";
const ENV = process.env.NODE_ENV || "dev";
const pathToCorrectEnvFile = `${__dirname}/../../../.env.${ENV}`;

require("dotenv").config({
  path: pathToCorrectEnvFile,
});

const authenticateToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next({ code: 401, msg: "Unauthorized" });
  }

  const PUBLIC_KEY = process.env.PUBLIC_KEY;

  if (!PUBLIC_KEY) {
    return response.status(500).send({ msg: "Server Error" });
  }

  const encryptionKey = Buffer.from(PUBLIC_KEY, "base64").toString("ascii");

  jsonwebtoken.verify(
    token,
    encryptionKey,
    {
      algorithms: ["RS256"],
    },
    (err, decodedToken) => {
      if (err || typeof decodedToken !== "object") {
        return response.status(401).send({ msg: "Unauthorized" });
      } else {
        request.headers = {
          userId: decodedToken.user_id,
          email: decodedToken.email,
        };
        next();
      }
    }
  );
};

export default authenticateToken;
