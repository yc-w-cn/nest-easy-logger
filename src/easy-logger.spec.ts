import * as sinon from "sinon";
import { expect } from "chai";
import { EasyLogger } from "./easy-logger";

describe("EasyLogger", () => {
  describe("[static methods]", () => {
    let processStdoutWriteSpy: sinon.SinonSpy;

    beforeEach(() => {
      processStdoutWriteSpy = sinon.spy(process.stdout, "write");
    });

    it("should print one message to the console", () => {
      const key = "RandomKey";
      const value = "RandomValue";

      EasyLogger.log(key, value);

      expect(processStdoutWriteSpy.calledOnce).to.be.true;
      expect(processStdoutWriteSpy.firstCall.firstArg).to.include(key);
      expect(processStdoutWriteSpy.firstCall.firstArg).to.include(value);
    });
  });
});
