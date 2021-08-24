import { injectable } from "inversify";

import { IMessageModel } from "@app/interfaces/message";
import {
  IMessageAttributes,
  IMessageInput,
  IMessageRepository,
} from "@app/interfaces/message.repository";

@injectable()
class MessageDummyRepository implements IMessageRepository {
  public async findOneByAttributes(
    _attributes: IMessageAttributes
  ): Promise<IMessageModel> {
    return {
      id: 1,
      uuid: "d52c4310-6ffb-4297-9da1-9f1bfdf06356",
      name: "kenobi",
      distance: 100,
      message: Array.from({ length: 3 })
        .map(() => "lorem")
        .join(","),
    };
  }

  public async findAll(): Promise<IMessageModel[]> {
    return [];
  }

  public async create(_input: IMessageInput): Promise<IMessageModel> {
    return this.findOneByAttributes({ id: 1 });
  }
}

export default MessageDummyRepository;
