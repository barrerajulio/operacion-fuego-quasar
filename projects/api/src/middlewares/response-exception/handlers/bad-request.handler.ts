import { injectable } from "inversify";
import { Response } from "express";

import {
  IExceptionHandler,
  IExceptionOptionsMake,
} from "@app/interfaces/exception-handler";

@injectable()
export class BadRequestHandler implements IExceptionHandler {
  public make(res: Response, _options: IExceptionOptionsMake): Response {
    res.status(400);
    return res.json({});
  }
}
