import { DateHelper as MrDateHelper } from "@codebit-labs/operacion-fuego-core";
import { injectable } from "inversify";

@injectable()
export class DateHelper extends MrDateHelper {
  public toDate(subject: string): Date {
    console.log("Now overwrite");
    return super.toDate(subject);
  }
}
