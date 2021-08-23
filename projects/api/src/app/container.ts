import { Container } from "inversify";
import { fireOperationCore } from "@codebit-labs/operacion-fuego-core";

import middlewareModule from "@app/middlewares/module";
import TopSecretModule from "@app/modules/top-secret/module";

const container = new Container();
container.load(fireOperationCore.container, middlewareModule, TopSecretModule);

export default container;
