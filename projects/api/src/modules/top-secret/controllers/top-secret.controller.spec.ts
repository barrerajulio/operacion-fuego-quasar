import faker from "faker";
import "reflect-metadata";

import { TopSecretController } from "./top-secret.controller";

describe("TopSecretController", () => {
  let subject: TopSecretController;

  beforeAll(() => {
    subject = new TopSecretController();
  });

  it("should be defined", () => {
    expect(subject).toBeDefined();
  });

  it("should be receive imperial ship's message and emtpy returns", async () => {
    const req: any = {};
    const sendFakeReturns = faker.random.words();
    const sendMockFn = jest.fn();
    sendMockFn.mockReturnValue(sendFakeReturns);
    const res: any = {
      send: sendMockFn,
    };
    expect(await subject.receiveMessage(req, res)).toEqual(sendFakeReturns);
    expect(sendMockFn).toHaveBeenCalledWith();
  });
});
