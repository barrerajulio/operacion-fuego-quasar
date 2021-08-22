import { ContainerModule } from "inversify";

import Symbols from "./symbols";
import { TopSecretController } from "./controllers/top-secret.controller";

const TopSecretModule = new ContainerModule((bind) => {
  bind(Symbols.TopSecretController).to(TopSecretController);
});

export default TopSecretModule;
