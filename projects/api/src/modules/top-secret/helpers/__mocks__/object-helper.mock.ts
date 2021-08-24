export const isUndefinedMockFn = jest.fn();
export const ObjectHelperMock = jest.fn().mockImplementation(() => ({
  isUndefined: isUndefinedMockFn,
}));
