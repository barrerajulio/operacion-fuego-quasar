import { ContainerModule } from "inversify";

import MessageDummyRepository from "./dummies/message.dummy.repository";

import Symbols from "./symbols";

const module = new ContainerModule((bind) => {
  bind(Symbols.IMessageRepository).to(MessageDummyRepository);
});

export default module;
