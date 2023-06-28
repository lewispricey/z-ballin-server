import { NextFunction, Request, Response } from "express";

const psqlError = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.code === "23502") {
    return response
      .status(400)
      .send({ msg: "Request is missing required properties" });
  }
  if (error.code === "22P02") {
    return response.status(400).send({ msg: "invalid id" });
  }
  next(error);
};

export default psqlError;
