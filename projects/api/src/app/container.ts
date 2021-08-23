import { Container } from "inversify";

import middlewareModule from "@app/middlewares/module";
import TopSecretModule from "@app/modules/top-secret/module";

const container = new Container();
container.load(TopSecretModule, middlewareModule);

export default container;
