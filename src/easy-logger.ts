import { Logger } from "@nestjs/common";
import { IContentFormatter } from "./content-formatter.interface";
import { DefaultContentFormatter } from "./default.content-formatter";
import { ARRAY_SEPARATOR } from "./constants";
import { LoggerKey } from "./logger-key.type";

export class EasyLogger extends Logger {
  private _contentFormatter: IContentFormatter = new DefaultContentFormatter();
  private _keyPrefix: string[] = [];

  setContentFormatter(contentFormatter: IContentFormatter) {
    this._contentFormatter = contentFormatter;
  }

  /**
   * when start a method, mark method names
   * @param keyPrefix
   */
  start(keyPrefix: LoggerKey = []) {
    if (typeof keyPrefix === "string") {
      this._keyPrefix = [keyPrefix];
    } else {
      this._keyPrefix = keyPrefix;
    }
  }

  /**
   * when finish a method, clear side effects
   */
  finish() {
    this._keyPrefix = []; // reset
  }

  /**
   * alias of start
   */
  begin(keyPrefix: LoggerKey = []) {
    this._keyPrefix = Array.isArray(keyPrefix) ? keyPrefix : [keyPrefix]
  }

  /**
   * alias of finish
   */
  end() {
    this.finish();
  }

  private formatter(key: LoggerKey, value?: any) {
    const innerKeys = [
      ...this._keyPrefix,
      ...(Array.isArray(key) ? key : [key]),
    ];
    return this._contentFormatter.print(innerKeys.join(ARRAY_SEPARATOR), value);
  }

  print(key: LoggerKey, value?: any) {
    super.log(this.formatter(key, value));
  }

  log(key: LoggerKey, value?: any) {
    super.log(this.formatter(key, value));
  }

  debug(key: LoggerKey, value?: any) {
    super.debug(this.formatter(key, value));
  }

  error(key: LoggerKey, value?: any) {
    super.error(this.formatter(key, value));
  }

  warn(key: LoggerKey, value?: any) {
    super.warn(this.formatter(key, value));
  }

  verbose(key: LoggerKey, value?: any) {
    super.verbose(this.formatter(key, value));
  }

  fatal(key: LoggerKey, value?: any) {
    super.fatal(this.formatter(key, value));
  }
}
