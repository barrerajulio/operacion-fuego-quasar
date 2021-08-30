import {
  BadRequestException,
  fireOperationCore,
  NotFoundException,
  ObjectHelper,
} from "@codebit-labs/operacion-fuego-core";
import { inject, injectable } from "inversify";

import Symbols from "@app/repositories/symbols";
import { ILocation, ISatellite } from "../interfaces/satellite";
import { IMessageModel } from "@app/interfaces/message";
import { IMessageRepository } from "@app/interfaces/message.repository";

@injectable()
export class TopSecretHelper {
  @inject(fireOperationCore.symbols.ObjectHelper)
  private objectHelper!: ObjectHelper;
  @inject(Symbols.IMessageRepository)
  private messageRepository!: IMessageRepository;

  public buildMessage(satellites: ISatellite[]): {
    message: string[];
    distance: { x: number; y: number };
  } {
    const message = this.getSatellitesMessage(satellites).reduce(
      this.buildSatelliteMessage.bind(this),
      []
    );
    const distance = this.getLocation(
      satellites.map((satellite) => satellite.distance)
    );
    return { message, distance };
  }

  public validate(message: string[]): true {
    const corruptMessage = message.find((word) => word === "");
    if (message.length === 0 || corruptMessage !== undefined) {
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

  public async getMessageAndDistance(): Promise<{
    distance: { x: number; y: number };
    message: string[];
  }> {
    const rows = await this.messageRepository.findAll();
    const satellites = this.transform(rows);
    const { distance, message } = this.buildMessage(satellites);
    this.validate(message);
    return { message, distance };
  }

  public getLocation(distances: number[]): ILocation {
    return this.calcLocation(distances);
  }

  private calcLocation(distances: number[]): ILocation {
    if (distances.length < 3) {
      throw new BadRequestException(
        "So sorry, we can't determine the location"
      );
    }
    const [distance1, distance2, distance3, ...nextDistances] = distances;
    const x = Math.atan2(Math.sqrt(distance1), Math.sqrt(distance2));
    let y = Math.atan2(x, Math.sqrt(distance3));
    return nextDistances.reduce<{ x: number; y: number }>(
      (prev, current) => {
        const y = Math.atan2(Math.sqrt(prev.x), Math.sqrt(current));
        return { x: prev.x, y };
      },
      { x, y }
    );
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
