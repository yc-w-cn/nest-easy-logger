import { bigIntReplacer } from './utils'; // 替换成实际的模块路径
import { expect } from "chai";

describe('bigIntReplacer', () => {
    it('should convert bigInt to string', () => {
        const bigIntValue = BigInt(12345678901234567890);
        const result = bigIntReplacer('testKey', bigIntValue);
        expect(result).to.be.a('string');
        expect(result).to.equal(bigIntValue.toString());
    });

    it('should return number as is', () => {
        const numberValue = 123;
        const result = bigIntReplacer('testKey', numberValue);
        expect(result).to.equal(numberValue);
    });

    it('should return string as is', () => {
        const stringValue = "test";
        const result = bigIntReplacer('testKey', stringValue);
        expect(result).to.equal(stringValue);
    });

    it('should return object as is', () => {
        const objectValue = { key: "value" };
        const result = bigIntReplacer('testKey', objectValue);
        expect(result).to.deep.equal(objectValue);
    });

    it('should return null as is', () => {
        const nullValue = null;
        const result = bigIntReplacer('testKey', nullValue);
        expect(result).to.be.null;
    });

    it('should return undefined as is', () => {
        const undefinedValue = undefined;
        const result = bigIntReplacer('testKey', undefinedValue);
        expect(result).to.be.undefined;
    });
});