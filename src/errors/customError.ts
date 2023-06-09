import { NextFunction, Request, Response } from "express";

const customError = (
  error: { code: number; msg: string },
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.msg) {
    response.status(error.code).send({ msg: error.msg });
  }
};

export default customError;
