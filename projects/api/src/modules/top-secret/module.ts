import { ContainerModule } from "inversify";

import Symbols from "./symbols";
import { TopSecretController } from "./controllers/top-secret.controller";
import { TopSecretHelper } from "./helpers/top-secret.helper";

const TopSecretModule = new ContainerModule((bind) => {
  bind(Symbols.TopSecretController).to(TopSecretController);
  bind(Symbols.TopSecretHelper).to(TopSecretHelper);
});

export default TopSecretModule;
