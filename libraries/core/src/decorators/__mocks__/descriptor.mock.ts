export const methodApplyMockFn = jest.fn();
export const descriptorValueSetMockFn = jest.fn();
export const descriptorValueGetMockFn = jest.fn();
export const descriptorMock: any = jest.fn().mockImplementation(() => ({
  value: {},
}));

Object.defineProperty(descriptorMock, "value", {
  set: descriptorValueSetMockFn,
  get: descriptorValueGetMockFn,
});
