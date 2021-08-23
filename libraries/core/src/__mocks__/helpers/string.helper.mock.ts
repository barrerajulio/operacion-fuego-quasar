export const isStringMockFn = jest.fn();
export const messageSetMockFn = jest.fn();
export const stringHelperMock = jest.fn().mockImplementation(() => ({
  isString: isStringMockFn,
}));
