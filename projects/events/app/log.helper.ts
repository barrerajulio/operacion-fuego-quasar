import {
  LogHelper as MrLogHelper,
  fireOperationCore,
} from "@codebit-labs/operacion-fuego-core";
import { provide } from "inversify-binding-decorators";

@provide(fireOperationCore.symbols.LogHelper)
export class LogHelper extends MrLogHelper {
  public log(subject: string): void {
    console.log("Overwrite mr log helper");
    super.log(subject);
  }
}
