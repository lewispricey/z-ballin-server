import { NextFunction, Request, Response } from "express";
import insertRegister from "../../models/auth/insertRegister";

interface postBody {
  email: string;
  password: string;
}

const postRegister = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password }: postBody = request.body;
  insertRegister(email, password)
    .then(() => {
      response.status(201).send({ user: { email } });
    })
    .catch(() => {
      next({ code: 400, msg: "account creation failed" });
    });
};

export default postRegister;
