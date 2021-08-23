export const buildMessageMockFn = jest.fn();
export const validateMockFn = jest.fn();
export const TopSecretHelperMock = jest.fn().mockImplementation(() => ({
  buildMessage: buildMessageMockFn,
  validate: validateMockFn,
}));
