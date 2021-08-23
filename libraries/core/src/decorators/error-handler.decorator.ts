import { NextFunction, Request, Response } from "express";

const errorHandler = (
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  descriptor.value = function (_: Request, __: Response, next: NextFunction) {
    try {
      const result = originalMethod.apply(this, arguments);
      if (result && result instanceof Promise) {
        return result.catch(async (error: any) => {
          next(error);
        });
      }
      return result;
    } catch (error) {
      next(error);
    }
  };

  return descriptor;
};

export default errorHandler;
