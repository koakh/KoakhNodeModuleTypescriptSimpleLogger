// tslint:disable: object-literal-sort-keys
import fs from 'fs';

export enum LogLevel {
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface LogLevelColor {
  [key: string]: string;
}

export const logLevelColor: LogLevelColor = {
  [LogLevel.INFO]: '\x1b[37m',
  [LogLevel.DEBUG]: '\x1b[32m',
  [LogLevel.ERROR]: '\x1b[31m',
  [LogLevel.WARN]: '\x1b[33m',
}

export const ConsoleTextColor = {
  Bright: '\x1b[1m',
  Reset: '\x1b[0m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  fg: {
    Black: '\x1b[30m',
    Red: '\x1b[31m',
    Green: '\x1b[32m',
    Yellow: '\x1b[33m',
    Blue: '\x1b[34m',
    Magenta: '\x1b[35m',
    Cyan: '\x1b[36m',
    White: '\x1b[37m',
    Crimson: '\x1b[38m',
  },
  bg: {
    Black: '\x1b[40m',
    Red: '\x1b[41m',
    Green: '\x1b[42m',
    Yellow: '\x1b[43m',
    Blue: '\x1b[44m',
    Magenta: '\x1b[45m',
    Cyan: '\x1b[46m',
    White: '\x1b[47m',
    Crimson: '\x1b[48m',
  }
};

export class Logger {

  public constructor(private logLevel: LogLevel, private filePath: string, private useColor: boolean = false) {
    // init log with a new file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  /**
   * main logFunction shortcut
   */
  public log = (logLevel: LogLevel, message: string | object) => {
    if (
      // error
      (this.logLevel === LogLevel.ERROR && (logLevel === LogLevel.ERROR)) ||
      (this.logLevel === LogLevel.WARN && (logLevel === LogLevel.WARN || logLevel === LogLevel.ERROR)) ||
      (this.logLevel === LogLevel.DEBUG && (logLevel === LogLevel.DEBUG || logLevel === LogLevel.WARN || logLevel === LogLevel.ERROR)) ||
      (this.logLevel === LogLevel.INFO)
    ) {
      this.logFunction(this.filePath, logLevel, message);
    }
  }

  /**
   * formatDate
   */
  private formatDate = (date: Date, fullDate = false): string => {
    const yy: string = date.getUTCFullYear().toString();
    const mo: string = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const dd: string = date.getUTCDate().toString().padStart(2, '0');
    const hh: string = date.getUTCHours().toString().padStart(2, '0');
    const mm: string = date.getUTCMinutes().toString().padStart(2, '0');
    const ss: string = date.getUTCSeconds().toString().padStart(2, '0');
    return (fullDate)
      ? `${yy}-${mo}-${dd} ${hh}:${mm}:${ss}`
      : `${hh}:${mm}:${ss}`;
  }

  private stripAnsi = (message: string): String => {
    return message.replace(/\033\[[0-9;]*m/g, '');
  }

  /**
   * main logFunction
   */
  private logFunction = (filePath: string, logLevel: LogLevel, message: string | object, textColor: string = undefined, consoleLog: boolean = true) => {
    // if textColor is not defined use default colors
    if (!textColor) { textColor = logLevelColor[logLevel]; };
    // if object convert object to sting text
    const printMessage: string = (typeof message === 'object') ? JSON.stringify(message, undefined, 2) : message;
    // always strip ansi colors
    const logMessage: string = `[${logLevel}] ${this.formatDate(new Date())} ${this.stripAnsi(printMessage)}`;
    if (consoleLog) {
      // useColor
      if (this.useColor) {
        const logMessageColor: string = this.useColor
          ? `${textColor} ${logMessage} ${ConsoleTextColor.Reset} `
          : logMessage;
          console.log(logMessageColor);
      } 
      // useColor disabled
      else {
        console.log(logMessage);
      }
    }
    // append non colorized message
    fs.appendFileSync(filePath, `${logMessage} \n`);
  }

}
