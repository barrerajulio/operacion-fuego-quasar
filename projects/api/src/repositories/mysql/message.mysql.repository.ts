import { injectable } from "inversify";
import { NotFoundException } from "@codebit-labs/operacion-fuego-core";

import MessageSequelizeModel from "./models/message.sequelize.model";
import {
  IMessageAttributes,
  IMessageInput,
  IMessageRepository,
} from "@app/interfaces/message.repository";
import { IMessageModel } from "@app/interfaces/message";

@injectable()
class MessageMysqlRepository implements IMessageRepository {
  public async findOneByAttributes(
    attributes: IMessageAttributes
  ): Promise<IMessageModel> {
    const row = await MessageSequelizeModel.findOne({
      where: { id: attributes.id },
    });
    if (!row) {
      throw new NotFoundException();
    }
    return this.transform(row);
  }
  public async findAll(): Promise<IMessageModel[]> {
    const rows = await MessageSequelizeModel.findAll();
    return rows.map(this.transform);
  }

  public async create({
    name,
    distance,
    message,
  }: IMessageInput): Promise<IMessageModel> {
    const row = await MessageSequelizeModel.create({
      name,
      distance,
      message,
    } as any);
    return this.findOneByAttributes({ id: row.id });
  }

  private transform({
    id,
    uuid,
    message,
  }: MessageSequelizeModel): IMessageModel {
    return {
      id,
      uuid,
      message,
    };
  }
}

export default MessageMysqlRepository;
