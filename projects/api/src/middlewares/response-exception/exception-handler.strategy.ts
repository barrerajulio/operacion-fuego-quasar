import { HttpException, HttpStatus } from "@codebit-labs/operacion-fuego-core";
import { inject, injectable } from "inversify";

import { IExceptionHandler } from "@app/interfaces/exception-handler";
import Symbols from "../symbols";

@injectable()
export class ExceptionHandlerStrategy {
  @inject(Symbols.ExceptionFactory)
  private exceptionFactory!: (statusCode: HttpStatus) => IExceptionHandler;

  public resolve(error: HttpException): IExceptionHandler {
    let statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    if (error instanceof HttpException) {
      statusCode = error.getStatus();
    }
    return this.exceptionFactory(statusCode);
  }
}
