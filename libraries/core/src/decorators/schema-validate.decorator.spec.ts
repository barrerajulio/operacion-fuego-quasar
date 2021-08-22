import faker from "faker";
import { schemaMockFn, validateMockFn } from "./__mocks__/schema.mock";

import {
  descriptorMock,
  descriptorValueSetMockFn,
  methodApplyMockFn,
} from "./__mocks__/descriptor.mock";
import schemaValidate from "./schema-validate.decorator";

describe("core.decorators.schemaValidate", () => {
  it("should be returns a function", () => {
    expect(schemaValidate(schemaMockFn)).toBeInstanceOf(Function);
  });
  it("should be setup the property value from descriptor", () => {
    schemaValidate(schemaMockFn)(null as any, null as any, descriptorMock);
    expect(descriptorValueSetMockFn).toHaveBeenCalledTimes(1);
  });
  it("should be throw an exception when the validation isn't successfull", async () => {
    const descriptorFake: any = {
      value: {
        apply: methodApplyMockFn,
      },
    };
    validateMockFn.mockReturnValue({
      error: {},
    });
    schemaValidate(schemaMockFn)(null as any, null as any, descriptorFake);
    await expect(() => descriptorFake.value({})).rejects.toThrowError(
      "Bad request"
    );
    expect(methodApplyMockFn).toHaveBeenCalledTimes(0);
    validateMockFn.mockRestore();
  });
  it("should be to call the body function and returns the method.apply's returns", async () => {
    const methodFakeReturn = faker.lorem.paragraph();
    const descriptorFake: any = {
      value: {
        apply: methodApplyMockFn,
      },
    };
    methodApplyMockFn.mockReturnValue(methodFakeReturn);
    descriptorFake.value.apply.mockReturnValue(methodFakeReturn);
    schemaValidate(schemaMockFn)(null as any, null as any, descriptorFake);
    const reqFake = {
      body: {
        [faker.datatype.uuid()]: faker.random.words(),
      },
    };
    validateMockFn.mockReturnValue({});
    expect(await descriptorFake.value(reqFake)).toEqual(methodFakeReturn);
    expect(validateMockFn).toHaveBeenCalledWith(reqFake.body);
  });
});
