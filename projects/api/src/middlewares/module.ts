import { ContainerModule } from "inversify";
import { HttpStatus } from "@codebit-labs/operacion-fuego-core";

import Symbols from "./symbols";
import { BadRequestHandler } from "./response-exception/handlers/bad-request.handler";
import { ExceptionHandler } from "./response-exception/handlers/exception.handler";
import { ExceptionHandlerStrategy } from "./response-exception/exception-handler.strategy";
import { IExceptionHandler } from "@app/interfaces/exception-handler";

const middlewareModule = new ContainerModule((bind) => {
  bind(Symbols.BadRequestHandler).to(BadRequestHandler);
  bind(Symbols.ExceptionHandlerStrategy).to(ExceptionHandlerStrategy);
  bind(Symbols.ExceptionHandler).to(ExceptionHandler);
  bind(Symbols.ExceptionFactory).toFactory(
    (context) => (statusCode: HttpStatus) => {
      let symbolResolver = Symbols.ExceptionHandler;
      const definitions: { [key: string]: symbol } = {
        [HttpStatus.BAD_REQUEST]: Symbols.BadRequestHandler,
      };
      if (definitions.hasOwnProperty(statusCode)) {
        symbolResolver = definitions[statusCode];
      }
      return context.container.get<IExceptionHandler>(definitions[statusCode]);
    }
  );
});

export default middlewareModule;
