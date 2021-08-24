export const findAllMockFn = jest.fn();
export const createMockFn = jest.fn();
export const MessageRepositoryMock = jest.fn().mockImplementation(() => ({
  findAll: findAllMockFn,
  create: createMockFn,
}));
