export const buildMessageMockFn = jest.fn();
export const validateMockFn = jest.fn();
export const storeMockFn = jest.fn();
export const getMessageMockFn = jest.fn();
export const TopSecretHelperMock = jest.fn().mockImplementation(() => ({
  buildMessage: buildMessageMockFn,
  validate: validateMockFn,
  store: storeMockFn,
  getMessageAndDistance: getMessageMockFn,
}));
