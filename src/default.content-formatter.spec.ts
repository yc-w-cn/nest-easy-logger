import { expect } from "chai";
import {
  DefaultContentFormatter,
  defaultEmptyValue,
} from "./default.content-formatter";

describe("DefaultContentFormatter", () => {
  const randomKey = "RandomKey";
  const randomValue = "RandomValue";

  describe("Default options", () => {
    const defaultContentFormatter = new DefaultContentFormatter();
    const randomObject = { [randomKey]: randomValue };

    it("should return key -> value", () => {
      expect(defaultContentFormatter.print(randomKey, randomValue)).equal(
        `${randomKey} -> ${randomValue}`
      );
    });

    it("should return key -> object", () => {
      expect(defaultContentFormatter.print(randomKey, randomObject)).equal(
        `${randomKey} -> {"${randomKey}":"${randomValue}"}`
      );
    });

    it("should return key", () => {
      expect(defaultContentFormatter.print(randomKey, null)).equal(randomKey);
      expect(defaultContentFormatter.print(randomKey, "")).equal(randomKey);
      expect(defaultContentFormatter.print(randomKey)).equal(randomKey);
    });

    it("should throw error", () => {
      expect(() => defaultContentFormatter.print("", null)).to.throw();
      expect(() => defaultContentFormatter.print(null, null)).to.throw();
    });
  });

  describe("Dynamic options", () => {
    it("should replaceEmptyValue with default option", () => {
      const defaultContentFormatter = new DefaultContentFormatter({
        replaceEmptyValue: true,
      });
      expect(
        defaultContentFormatter
          .print("", randomValue)
          .includes(defaultEmptyValue)
      );
      expect(
        defaultContentFormatter.print(randomKey, "").includes(defaultEmptyValue)
      );
    });

    it("should replaceEmptyValue with custom option", () => {
      const replaceEmptyValue = "EMPTY VALUE";
      const defaultContentFormatter = new DefaultContentFormatter({
        replaceEmptyValue,
      });
      expect(defaultContentFormatter.print("", randomValue)).to.includes(
        replaceEmptyValue
      );
      expect(defaultContentFormatter.print(randomKey, "")).to.includes(
        replaceEmptyValue
      );
    });
  });
});
