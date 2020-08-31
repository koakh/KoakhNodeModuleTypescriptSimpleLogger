"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.ConsoleTextColor = exports.logLevelColor = exports.LogLevel = void 0;
// tslint:disable: object-literal-sort-keys
const fs_1 = __importDefault(require("fs"));
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
exports.logLevelColor = {
    [LogLevel.INFO]: '\x1b[37m',
    [LogLevel.DEBUG]: '\x1b[32m',
    [LogLevel.ERROR]: '\x1b[31m',
    [LogLevel.WARN]: '\x1b[33m',
};
exports.ConsoleTextColor = {
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
class Logger {
    constructor(logLevel, filePath) {
        this.logLevel = logLevel;
        this.filePath = filePath;
        /**
         * main logFunction shortcut
         */
        this.log = (logLevel, message) => {
            if (
            // error
            (this.logLevel === LogLevel.ERROR && (logLevel === LogLevel.ERROR)) ||
                (this.logLevel === LogLevel.WARN && (logLevel === LogLevel.WARN || logLevel === LogLevel.ERROR)) ||
                (this.logLevel === LogLevel.DEBUG && (logLevel === LogLevel.DEBUG || logLevel === LogLevel.WARN || logLevel === LogLevel.ERROR)) ||
                (this.logLevel === LogLevel.INFO)) {
                this.logFunction(this.filePath, logLevel, message);
            }
        };
        /**
         * formatDate
         */
        this.formatDate = (date, fullDate = false) => {
            const yy = date.getUTCFullYear().toString();
            const mo = (date.getUTCMonth() + 1).toString().padStart(2, '0');
            const dd = date.getUTCDate().toString().padStart(2, '0');
            const hh = date.getUTCHours().toString().padStart(2, '0');
            const mm = date.getUTCMinutes().toString().padStart(2, '0');
            const ss = date.getUTCSeconds().toString().padStart(2, '0');
            return (fullDate)
                ? `${yy}-${mo}-${dd} ${hh}:${mm}:${ss}`
                : `${hh}:${mm}:${ss}`;
        };
        /**
         * main logFunction
         */
        this.logFunction = (filePath, logLevel, message, textColor = undefined, consoleLog = true) => {
            // if textColor is not defined use default colors
            if (!textColor) {
                textColor = exports.logLevelColor[logLevel];
            }
            ;
            // if object convert object to sting text
            const printMessage = (typeof message === 'object') ? JSON.stringify(message, undefined, 2) : message;
            const logMessage = `[${logLevel}] ${this.formatDate(new Date())} ${printMessage}`;
            // colorized
            const logMessageColor = `${textColor} ${logMessage} ${exports.ConsoleTextColor.Reset} `;
            if (consoleLog) {
                console.log(logMessageColor);
            }
            // append non colorized message
            fs_1.default.appendFileSync(filePath, `${logMessage} \n`);
        };
        // init log with a new file
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map