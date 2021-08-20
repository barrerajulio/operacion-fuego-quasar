import { inject, injectable } from "inversify";
import {
  fireOperationCore,
  ObjectHelper,
} from "@codebit-labs/operacion-fuego-core";

import { container } from "../container";
import { Repository } from "../repository";
import { Symbols } from "../symbols";

@injectable()
export class BaseUtils {
  @inject(fireOperationCore.symbols.ObjectHelper)
  private objectHelper!: ObjectHelper;

  public hello(): string {
    const repository = container.get<Repository>(Symbols.Repository);
    const objectHelper = container.get<ObjectHelper>(
      fireOperationCore.symbols.ObjectHelper
    );
    console.log(objectHelper.toString(100));
    console.log(repository.getOne(1));
    return `Hello world on ${this.objectHelper.toString(10)}`;
  }
}
