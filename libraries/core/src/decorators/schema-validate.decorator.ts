import { Schema } from "joi";

import { BadRequestException } from "../exceptions/bad-request.exception";

function schemaValidate(schema: Schema) {
  return function (
    _: Record<string, any>,
    __: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    descriptor.value = function (req: Request) {
      const { error: hasError } = schema.validate(req.body);
      if (!!hasError) {
        throw new BadRequestException(hasError);
      }
      /* eslint-disable-next-line prefer-rest-params */
      return method!.apply(this, arguments);
    };
  };
}

export default schemaValidate;
