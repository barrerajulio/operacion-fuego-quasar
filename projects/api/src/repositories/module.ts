import { ContainerModule } from "inversify";

// import MessageDummyRepository from "./dummies/message.dummy.repository";
import MessageMysqlRepository from "./mysql/message.mysql.repository";

import Symbols from "./symbols";

const module = new ContainerModule((bind) => {
  bind(Symbols.IMessageRepository).to(MessageMysqlRepository);
});

export default module;
