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
  next(error);
};

export default psqlError;
