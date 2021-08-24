export const httpStatusDecoratorMockFn = jest.fn();
export const decoratorMock = function () {
  return (_target: any, _propertyKey: any, descriptor: any) => {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      /* eslint-disable-next-line prefer-rest-params */
      return originalMethod.apply(this, arguments);
    };

    return descriptor;
  };
};
