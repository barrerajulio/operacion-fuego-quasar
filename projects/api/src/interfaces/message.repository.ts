import { IMessageModel } from "./message";

export interface IMessageInput {
  name: string;
  message: string;
  distance: number;
}

export interface IMessageAttributes {
  id: number;
}

export interface IMessageRepository {
  findOneByAttributes(criteria: IMessageAttributes): Promise<IMessageModel>;
  findAll(): Promise<IMessageModel[]>;
  create(input: IMessageInput): Promise<IMessageModel>;
}
