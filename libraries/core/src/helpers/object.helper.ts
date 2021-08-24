import { injectable } from "inversify";

@injectable()
export class ObjectHelper {
  public toString(subject: number): string {
    return subject.toString();
  }

  public isObject(fn: any): fn is object {
    return !this.isNil(fn) && typeof fn === "object";
  }

  public isNil(obj: any): obj is null | undefined {
    return this.isUndefined(obj) || obj === null;
  }

  public isUndefined(obj: any): obj is undefined {
    return typeof obj === "undefined";
  }

  public static create(): ObjectHelper {
    return new ObjectHelper();
  }
}
