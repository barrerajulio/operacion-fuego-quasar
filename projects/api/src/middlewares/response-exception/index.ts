import { NextFunction, Request, Response } from "express";

import container from "@app/app/container";
import Symbols from "../symbols";
import { ExceptionHandlerStrategy } from "./exception-handler.strategy";

const responseExceptionMiddleware = (
  error: any,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  const strategy = container.get<ExceptionHandlerStrategy>(
    Symbols.ExceptionHandlerStrategy
  );
  return strategy.resolve(error).make(res, {
    error,
  });
};

export default responseExceptionMiddleware;
