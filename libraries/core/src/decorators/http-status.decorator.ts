import { Request, Response } from "express";

import { HttpStatus } from "../enums";

function httpStatus(statusCode: HttpStatus) {
  return function (
    _: Record<string, any>,
    __: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    descriptor.value = function (_: Request, res: Response) {
      res.status(statusCode);
      return method!.apply(this, arguments);
    };
  };
}

export default httpStatus;
