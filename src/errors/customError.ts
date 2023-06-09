import { NextFunction, Request, Response } from "express";

const customError = (
  error: { status: number; msg: string },
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.msg) {
    response.status(error.status).send({ msg: error.msg });
  }
};

export default customError;
