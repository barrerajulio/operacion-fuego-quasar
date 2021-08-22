import { Container } from "inversify";

import TopSecretModule from "@app/modules/top-secret/module";

const container = new Container();
container.load(TopSecretModule);

export default container;
