import { ContainerModule } from "inversify";

import { ObjectHelper } from "../helpers/object.helper";
import { Symbols } from "./symbols";

const container = new ContainerModule((bind) => {
  bind(Symbols.ObjectHelper).to(ObjectHelper);
});

export const fireOperationCore = {
  container,
  symbols: Symbols,
};
