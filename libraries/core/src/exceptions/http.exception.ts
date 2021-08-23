import { ObjectHelper } from "../helpers/object.helper";
import { ObjectOrString } from "../types";
import { StringHelper } from "../helpers/string.helper";

export class HttpException extends Error {
  private stringHelper!: StringHelper;

  public constructor(
    private readonly response: ObjectOrString,
    private readonly status: number
  ) {
    super();
    // fix issue https://github.com/microsoft/TypeScript/issues/15606
    Object.setPrototypeOf(this, new.target.prototype);
    this.init();
    this.configureMessage();
  }

  private init(): void {
    this.stringHelper = StringHelper.create();
  }

  private configureMessage(): void {
    if (this.stringHelper.isString(this.response)) {
      this.message = this.response;
      return;
    }
    this.message = this.response.message;
  }

  public static createBody(
    objectOrError: object | string,
    description?: string,
    statusCode?: number
  ) {
    const objectHelper = ObjectHelper.create();
    if (!objectOrError) {
      return { statusCode, message: description };
    }
    return objectHelper.isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: description };
  }
}
