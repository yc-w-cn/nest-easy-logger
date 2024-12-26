import { IContentFormatter } from "./content-formatter.interface";
import { bigIntReplacer } from "./utils";

export type DefaultContentFormatterOptions = {
  replaceEmptyValue: boolean | string;
};

/**
 * 默认配置项
 */
export const defaultOptions: DefaultContentFormatterOptions = {
  replaceEmptyValue: false,
};

/**
 * 默认空值替换值（需要在配置项中开启）
 */
export const defaultEmptyValue = "(empty)"

export class DefaultContentFormatter implements IContentFormatter {
  private _options: DefaultContentFormatterOptions;

  constructor(options: Partial<DefaultContentFormatterOptions> = {}) {
    // 合并配置项
    this._options = { ...defaultOptions, ...options };
  }

  /**
   * 默认格式
   * - 如果 (key, value) 都存在值，打印 key -> 字符串化以后的 value
   * - 如果 (key, object)，则打印 key -> 序列化以后的 object
   * - 如果 (key, null) 只存在 key，则只打印 key
   */
  public print(key: string, value: any = ""): string {
    const innerKey = this.replaceEmptyValue(key)
    const innerValue = this.replaceEmptyValue(value)
    if (!innerKey) {
      throw new Error("error: missing key");
    }
    if (!innerValue) {
      return innerKey;
    }
    if (typeof innerValue === "string") {
      return `${innerKey} -> ${innerValue}`;
    } else if (innerValue) {
      return `${innerKey} -> ${JSON.stringify(innerValue, bigIntReplacer)}`;
    }
    throw new Error("error");
  }

  private replaceEmptyValue(value: string) {
    let emptyValue = defaultEmptyValue
    if (this._options.replaceEmptyValue === false) return value;
    if(typeof this._options.replaceEmptyValue === 'string'){
      emptyValue = this._options.replaceEmptyValue
    }
    if(!value){
      return emptyValue
    }
    return value
  }
}
