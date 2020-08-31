import { LogLevel } from './index';

export type ProxyLogFunction = (logLevel: LogLevel, message: string) => void;
