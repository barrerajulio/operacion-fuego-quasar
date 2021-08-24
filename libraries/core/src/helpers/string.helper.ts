import { injectable } from "inversify";

@injectable()
export class StringHelper {
  public toInt(subject: string): number {
    return parseInt(subject);
  }

  public isString(fn: any): fn is string {
    return typeof fn === "string";
  }

  public static create() {
    return new StringHelper();
  }
}
