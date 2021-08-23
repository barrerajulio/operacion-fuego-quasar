import "reflect-metadata";
import faker from "faker";

import { HttpException } from "./http.exception";
import {
  isStringMockFn,
  messageSetMockFn,
  stringHelperMock,
} from "../__mocks__/helpers/string.helper.mock";
import { StringHelper } from "../helpers/string.helper";

describe("core.exceptions.HttpException", () => {
  let subject: typeof HttpException & {
    configureMessage: () => void;
    stringHelper: typeof StringHelper;
    response: string | Record<string, any>;
    message: string;
  };

  beforeAll(() => {
    subject = new HttpException("LoremException", 300) as any;
    subject.stringHelper = new stringHelperMock();
    subject.message = {} as any;
    Object.defineProperty(subject, "message", { set: messageSetMockFn });
  });

  it("should be defined", () => {
    expect(subject).toBeDefined();
  });

  describe("should be setup a message from response", () => {
    it("when the response property is string then is the value for message", () => {
      subject.response = faker.lorem.paragraph();
      isStringMockFn.mockReturnValue(true);
      expect(subject.configureMessage());
      expect(isStringMockFn).toHaveBeenCalledWith(subject.response);
      expect(messageSetMockFn).toHaveBeenCalledWith(subject.response);
      isStringMockFn.mockRestore();
      messageSetMockFn.mockRestore();
    });
    it("when the response property is not string then the message there is on the property's response.message", () => {
      subject.response = {
        message: faker.lorem.paragraph(),
      };
      isStringMockFn.mockReturnValue(false);
      expect(subject.configureMessage()).toBeUndefined();
      expect(messageSetMockFn).toHaveBeenCalledWith(subject.response.message);
    });
  });
});
