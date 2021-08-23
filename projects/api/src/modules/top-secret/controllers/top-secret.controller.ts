import {
  errorHandler,
  httpStatus,
  HttpStatus,
  schemaValidate,
} from "@codebit-labs/operacion-fuego-core";
import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import receiveMessageSchema from "../schemas/top-secret/receive-message.schema";
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
}
