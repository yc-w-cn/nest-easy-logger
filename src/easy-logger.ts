import { Logger } from "@nestjs/common";
import { IContentFormatter } from "./content-formatter.interface";
import { DefaultContentFormatter } from "./default.content-formatter";
import { ARRAY_SEPARATOR } from "./constants";
import { LoggerKey } from "./logger-key.type";

export class EasyLogger extends Logger {
  private _contentFormatter: IContentFormatter = new DefaultContentFormatter();

  setContentFormatter(contentFormatter: IContentFormatter) {
    this._contentFormatter = contentFormatter;
  }

  private formatter(key: LoggerKey, value?: any) {
    if(Array.isArray(key)){
      return this._contentFormatter.print(key.join(ARRAY_SEPARATOR), value);
    }
    else {
      return this._contentFormatter.print(key, value);
    }
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
