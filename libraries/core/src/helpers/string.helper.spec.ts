import "reflect-metadata";
import faker from "faker";

import { StringHelper } from "./string.helper";

describe("core.helpers.StringHelper", () => {
  let subject: StringHelper;

  beforeAll(() => {
    subject = new StringHelper();
  });

  it("should be defined", () => {
    expect(subject).toBeDefined();
  });

  describe("check if arg fn is a valid string", () => {
    it("should be returns true when is string", () => {
      const fakeString = faker.random.word();
      expect(subject.isString(fakeString)).toEqual(true);
    });
    it("should be returns false when is'nt a valid string", () => {
      const fakeOption = faker.random.arrayElement([
        {},
        faker.datatype.number(),
        [],
      ]);
      expect(subject.isString(fakeOption)).toEqual(false);
    });
  });
});
