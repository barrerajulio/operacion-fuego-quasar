import {
  errorHandler,
  httpStatus,
  HttpStatus,
  schemaValidate,
} from "@codebit-labs/operacion-fuego-core";
import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import receiveMessageSchema from "../schemas/top-secret/receive-message.schema";
import receivePartialMessageSchema from "../schemas/top-secret/receive-partial-message.schema";
import Symbols from "../symbols";
import { TopSecretHelper } from "../helpers/top-secret.helper";

@injectable()
export class TopSecretController {
  @inject(Symbols.TopSecretHelper)
  private topSecretHelper!: TopSecretHelper;

  @errorHandler
  @schemaValidate(receiveMessageSchema)
  @httpStatus(HttpStatus.CREATED)
  public async receiveMessage(req: Request, res: Response): Promise<Response> {
    const { satellites } = req.body;
    const message = this.topSecretHelper.buildMessage(satellites);
    this.topSecretHelper.validate(message);
    return res.send({
      message,
    });
  }

  @errorHandler
  @httpStatus(HttpStatus.NO_CONTENT)
  @schemaValidate(receivePartialMessageSchema)
  public async receivePartialMessage(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { distance, message } = req.body;
    const { satelliteName } = req.params;
    await this.topSecretHelper.store({
      distance,
      message,
      name: satelliteName,
    });
    return res.json();
  }

  @errorHandler
  public async decodeMessage(_: Request, res: Response): Promise<Response> {
    const message = await this.topSecretHelper.getMessage();
    return res.json({
      position: [100, 49872],
      message,
    });
  }
}
