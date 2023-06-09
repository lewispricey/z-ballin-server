import { NextFunction, Request, Response } from "express";

type Controller = (
  request: Request,
  response: Response,
  next: NextFunction
) => void;

export default Controller;
