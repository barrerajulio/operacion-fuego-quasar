import {
  httpStatus,
  HttpStatus,
  schemaValidate,
} from "@codebit-labs/operacion-fuego-core";
import { injectable } from "inversify";
import { Request, Response } from "express";

import receiveMessageSchema from "../schemas/top-secret/receive-message.schema";

@injectable()
export class TopSecretController {
  @schemaValidate(receiveMessageSchema)
  @httpStatus(HttpStatus.NO_CONTENT)
  public async receiveMessage(_req: Request, res: Response): Promise<Response> {
    return res.send();
  }
}
