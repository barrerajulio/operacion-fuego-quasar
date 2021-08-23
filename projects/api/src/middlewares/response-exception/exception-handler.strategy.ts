import { HttpException, HttpStatus } from "@codebit-labs/operacion-fuego-core";
import { inject, injectable } from "inversify";

import { IExceptionHandler } from "@app/interfaces/exception-handler";
import Symbols from "../symbols";

@injectable()
export class ExceptionHandlerStrategy {
  @inject(Symbols.ExceptionFactory)
  private exceptionFactory!: (statusCode: HttpStatus) => IExceptionHandler;

  public resolve(error: HttpException): IExceptionHandler {
    return this.exceptionFactory(error.getStatus());
  }
}
