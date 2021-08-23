import faker from "faker";
import "reflect-metadata";

import { TopSecretController } from "./top-secret.controller";
import { TopSecretHelper } from "../helpers/top-secret.helper";
import {
  buildMessageMockFn,
  TopSecretHelperMock,
  validateMockFn,
} from "./__mocks__/top-secret.helper.mock";

describe("TopSecretController", () => {
  let subject: Omit<TopSecretController, "topSecretHelper"> & {
    topSecretHelper: TopSecretHelper;
  };

  beforeAll(() => {
    subject = new TopSecretController() as any;
    subject.topSecretHelper = new TopSecretHelperMock();
  });

  it("should be defined", () => {
    expect(subject).toBeDefined();
  });

  it("should be receive imperial ship's message and emtpy returns", async () => {
    const req: any = {
      body: {
        satellites: [
          {
            name: "kenobi",
            distance: 100.0,
            message: ["este", "", "", "mensaje", ""],
          },
          {
            name: "skywalker",
            distance: 115.5,
            message: ["", "es", "", "", "secreto"],
          },
          {
            name: "sato",
            distance: 142.7,
            message: ["este", "", "un", "", ""],
          },
        ],
      },
    };
    const sendFakeReturns = faker.random.words();
    const sendMockFn = jest.fn();
    sendMockFn.mockReturnValue(sendFakeReturns);
    const res: any = {
      send: sendMockFn,
      status: () => {},
    };
    buildMessageMockFn.mockReturnValue(sendFakeReturns);
    expect(await subject.receiveMessage(req, res)).toEqual(sendFakeReturns);
    expect(sendMockFn).toHaveBeenCalledWith({ message: sendFakeReturns });
    expect(buildMessageMockFn).toHaveBeenCalledWith(req.body.satellites);
    expect(validateMockFn).toHaveBeenCalledWith(sendFakeReturns);
  });
});
