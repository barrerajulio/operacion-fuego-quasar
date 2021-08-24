import { HttpException } from "./http.exception";
import { HttpStatus } from "../enums/https-status.enum";
import { ObjectOrString } from "../types";

export class BadRequestException extends HttpException {
  public constructor(message: ObjectOrString, description = "Bad request") {
    super(
      HttpException.createBody(message, description, HttpStatus.BAD_REQUEST),
      HttpStatus.BAD_REQUEST
    );
  }
}
