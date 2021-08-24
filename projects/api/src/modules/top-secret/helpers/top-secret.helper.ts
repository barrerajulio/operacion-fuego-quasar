import {
  fireOperationCore,
  NotFoundException,
  ObjectHelper,
} from "@codebit-labs/operacion-fuego-core";
import { inject, injectable } from "inversify";

import Symbols from "@app/repositories/symbols";
import { IMessageModel } from "@app/interfaces/message";
import { IMessageRepository } from "@app/interfaces/message.repository";
import { ISatellite } from "../interfaces/satellite";

@injectable()
export class TopSecretHelper {
  @inject(fireOperationCore.symbols.ObjectHelper)
  private objectHelper!: ObjectHelper;
  @inject(Symbols.IMessageRepository)
  private messageRepository!: IMessageRepository;

  public buildMessage(satellites: ISatellite[]): string[] {
    return this.getSatellitesMessage(satellites).reduce(
      this.buildSatelliteMessage.bind(this),
      []
    );
  }

  public validate(message: string[]): true {
    const corruptMessage = message.find((word) => word === "");
    if (corruptMessage !== undefined) {
      throw new NotFoundException();
    }
    return true;
  }

  public async store({ message, name, distance }: ISatellite): Promise<void> {
    await this.messageRepository.create({
      name,
      distance,
      message: message.join(","),
    });
  }

  public async getMessage(): Promise<string[]> {
    const rows = await this.messageRepository.findAll();
    const satellites = this.transform(rows);
    const message = this.buildMessage(satellites);
    this.validate(message);
    return message;
  }

  private buildWordOnMessage(
    message: string[],
    { word, index }: { word: string; index: number }
  ): string[] {
    if (this.objectHelper.isUndefined(message[index]) === true) {
      return message.concat(word);
    }
    message[index] = word !== "" ? word : message[index];
    return message;
  }

  private transform(rows: IMessageModel[]): ISatellite[] {
    return rows.map((row) => ({
      name: row.name,
      distance: row.distance,
      message: row.message.split(","),
    }));
  }

  private buildSatelliteMessage(
    message: string[],
    incomingMessage: string[]
  ): string[] {
    return incomingMessage.reduce(
      (messageDecoded, word, index) =>
        this.buildWordOnMessage(messageDecoded, { word, index }),
      message
    );
  }

  private getSatellitesMessage(satellites: ISatellite[]): string[][] {
    return satellites.map((satellite) => satellite.message);
  }
}
