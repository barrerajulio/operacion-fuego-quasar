import { injectable } from "inversify";
import { Response } from "express";

import {
  IExceptionHandler,
  IExceptionOptionsMake,
} from "@app/interfaces/exception-handler";

@injectable()
export class NotFoundHandler implements IExceptionHandler {
  public make(res: Response, _options: IExceptionOptionsMake): Response | void {
    res.status(404);
    return res.end();
  }
}
