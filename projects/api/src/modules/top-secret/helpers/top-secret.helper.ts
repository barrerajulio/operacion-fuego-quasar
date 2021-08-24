import {
  fireOperationCore,
  NotFoundException,
  ObjectHelper,
} from "@codebit-labs/operacion-fuego-core";
import { inject, injectable } from "inversify";

import Symbols from "@app/repositories/symbols";
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
