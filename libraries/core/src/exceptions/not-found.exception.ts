import { HttpException } from "./http.exception";
import { HttpStatus } from "../enums/https-status.enum";
import { ObjectOrString } from "../types";

export class NotFoundException extends HttpException {
  public constructor(message?: ObjectOrString, description = "Not found") {
    super(
      HttpException.createBody(message, description, HttpStatus.NOT_FOUND),
      HttpStatus.NOT_FOUND
    );
  }
}
