import { Schema } from "joi";

function schemaValidate(schema: Schema) {
  return function (
    _: Record<string, any>,
    __: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    descriptor.value = function (req: Request) {
      const { error: hasError } = schema.validate(req.body);
      if (hasError) {
        throw new Error("Bad request");
      }
      /* eslint-disable-next-line prefer-rest-params */
      return method!.apply(this, arguments);
    };
  };
}

export default schemaValidate;
