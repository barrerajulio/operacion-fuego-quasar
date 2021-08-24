import { Container } from "inversify";
import { fireOperationCore } from "@codebit-labs/operacion-fuego-core";

import globalModule from "./module";
import middlewareModule from "@app/middlewares/module";
import repositoryModule from "@app/repositories/module";
import TopSecretModule from "@app/modules/top-secret/module";

const container = new Container();
container.load(
  fireOperationCore.container,
  globalModule,
  middlewareModule,
  TopSecretModule,
  repositoryModule
);

export default container;
