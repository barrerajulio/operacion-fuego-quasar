import { Container } from "inversify";

import { fireOperationCore } from "./../core";

const container = new Container();
container.load(fireOperationCore.container);

export { container };
