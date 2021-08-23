import "reflect-metadata";
import { ObjectHelper } from "@codebit-labs/operacion-fuego-core";

import {
  isUndefinedMockFn,
  ObjectHelperMock,
} from "./__mocks__/object-helper.mock";
import { TopSecretHelper } from "./top-secret.helper";

describe("api.top-secret.helpers.TopSecretHelper", () => {
  let subject: Omit<TopSecretHelper, "objectHelper"> & {
    objectHelper: ObjectHelper;
    buildSatelliteMessage: (
      message: string[],
      incomingMessage: string[]
    ) => string[];
    buildWordOnMessage: (
      message: string[],
      options: { word: string; index: number }
    ) => string[];
    getSatellitesMessage: (satellites: any[]) => string[];
  };

  beforeAll(() => {
    subject = new TopSecretHelper() as any;
    subject.objectHelper = new ObjectHelperMock();
  });

  it("should be defined", () => {
    expect(subject).toBeDefined();
  });

  /**
   * @example input
   * ["este", "", "mensaje"]
   * ["", "es", "mensaje"]
   * @output
   * ["este", "es", "mensaje"]
   */
  describe("should be build a message", () => {
    it("when there is already configured then only overwrite", () => {
      const message = ["este", "", "mensaje"];
      const wordIncoming = "es";
      const index = 1;
      expect(
        subject.buildWordOnMessage(message, { word: wordIncoming, index })
      ).toEqual(["este", "es", "mensaje"]);
      expect(isUndefinedMockFn).toHaveBeenLastCalledWith("");
      isUndefinedMockFn.mockRestore();
    });
    it("when there is does not exist then add to array", () => {
      const message = ["este"];
      const wordIncoming = "es";
      const index = 1;
      isUndefinedMockFn.mockReturnValue(true);
      expect(
        subject.buildWordOnMessage(message, { word: wordIncoming, index })
      ).toEqual(["este", "es"]);
    });
  });

  it("should be build a message from one satellite", () => {
    const kenobi = ["este", "", "", "mensaje"];
    const message = ["", "es", "", "message"];
    expect(subject.buildSatelliteMessage(message, kenobi));
    expect(isUndefinedMockFn).toHaveBeenCalledTimes(5);
  });

  it("should be get only message from communications", () => {
    const satellites = [
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
    ];
    const [kenobi, skywalker, sato] = satellites;
    expect(subject.getSatellitesMessage(satellites)).toEqual([
      kenobi.message,
      skywalker.message,
      sato.message,
    ]);
  });

  it("should be able to build a message from all satellites", () => {
    const satellites = [
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
    ];
    const buildSatelliteMessageSpy = jest.spyOn(
      subject,
      "buildSatelliteMessage"
    );
    expect(subject.buildMessage(satellites));
    expect(buildSatelliteMessageSpy).toHaveBeenCalledTimes(3);
  });

  describe("should be validate if the message was completed successfully", () => {
    it("when the message only contains items with content and not empty then message's valid", () => {
      const message = ["message", "complete", "is", "valid"];
      expect(subject.validate(message)).toEqual(true);
    });
    it("when the message contains an empty item then is invalid and will throw an NotFoundException", () => {
      const message = ["message", "", "corrupt"];
      expect(() => subject.validate(message)).toThrow();
    });
  });
});
