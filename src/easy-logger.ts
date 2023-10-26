import { Logger } from "@nestjs/common";
import { IContentFormatter } from "./content-formatter.interface";
import { DefaultContentFormatter } from "./default.content-formatter";

export class EasyLogger extends Logger {
  private _contentFormatter: IContentFormatter = new DefaultContentFormatter();

  setContentFormatter(contentFormatter: IContentFormatter) {
    this._contentFormatter = contentFormatter;
  }

  print(key: string, value?: any) {
    this.log(this._contentFormatter.print(key, value));
  }

  log(key: string, value?: any) {
    this.log(this._contentFormatter.print(key, value));
  }

  debug(key: string, value?: any) {
    this.debug(this._contentFormatter.print(key, value));
  }

  error(key: string, value?: any) {
    this.error(this._contentFormatter.print(key, value));
  }

  warn(key: string, value?: any) {
    this.warn(this._contentFormatter.print(key, value));
  }

  verbose(key: string, value?: any) {
    this.verbose(this._contentFormatter.print(key, value));
  }
}
