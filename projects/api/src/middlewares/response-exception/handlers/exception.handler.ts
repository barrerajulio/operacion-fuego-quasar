import { HttpStatus } from "@codebit-labs/operacion-fuego-core";
import { injectable } from "inversify";
import { Response } from "express";

import {
  IExceptionHandler,
  IExceptionOptionsMake,
} from "@app/interfaces/exception-handler";

@injectable()
export class ExceptionHandler implements IExceptionHandler {
  public make(res: Response, _options: IExceptionOptionsMake): Response {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    return res.json({});
  }
}
