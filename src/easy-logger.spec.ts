import * as sinon from "sinon";
import { expect } from "chai";
import { EasyLogger } from "./easy-logger";

describe("EasyLogger", () => {
  let processStdoutWriteSpy: sinon.SinonSpy;
  beforeEach(() => {
    processStdoutWriteSpy = sinon.spy(process.stdout, "write");
  });

  describe("[static methods]", () => {
    it("should print one message to the console", () => {
      const key = "RandomKey";
      const value = "RandomValue";

      EasyLogger.log(key, value);

      expect(processStdoutWriteSpy.calledOnce).to.be.true;
      expect(processStdoutWriteSpy.firstCall.firstArg).to.include(key);
      expect(processStdoutWriteSpy.firstCall.firstArg).to.include(value);
    });

    afterEach(() => {
      processStdoutWriteSpy.restore();
    });
  });

  describe("[instance]", () => {
    it("should print one message to the console", () => {
      const key = "RandomKey";
      const value = "RandomValue";
      const name = "TestLogger";
      const logger = new EasyLogger(name);

      logger.log(key, value);

      expect(processStdoutWriteSpy.calledOnce).to.be.true;
      expect(processStdoutWriteSpy.firstCall.firstArg).to.include(key);
      expect(processStdoutWriteSpy.firstCall.firstArg).to.include(value);
      expect(processStdoutWriteSpy.firstCall.firstArg).to.include(name);
    });

    it("should support key of array type", () => {
      const keys = ["RandomKey1", "RandomKey2"];
      const value = "RandomValue";
      const name = "TestLogger";
      const logger = new EasyLogger(name);

      logger.log(keys, value);

      expect(processStdoutWriteSpy.calledOnce).to.be.true;
      expect(processStdoutWriteSpy.firstCall.firstArg).to.include(keys[0]);
      expect(processStdoutWriteSpy.firstCall.firstArg).to.include(keys[1]);
      expect(processStdoutWriteSpy.firstCall.firstArg).to.include(value);
      expect(processStdoutWriteSpy.firstCall.firstArg).to.include(name);
    });

    afterEach(() => {
      processStdoutWriteSpy.restore();
    });
  });
});
