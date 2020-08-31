# README

a simple logger implementation, without dependencies...

## Links

- [GitHub](https://github.com/koakh/KoakhNodeModuleTypescriptSimpleLogger)
- [NPM](https://www.npmjs.com/package/@koakh/typescript-simple-logger)

## Usage

use like that

add to `.env`

```shell
# logLevel
LOG_LEVEL=ERROR
```

`constants.ts`

```typescript
// env constants
const LOG_LEVEL: LogLevel = (process.env.LOG_LEVEL) ? getEnumKeyFromEnumValue(LogLevel, process.env.LOG_LEVEL) : LogLevel.ERROR;
```

```typescript
import { Logger, LogLevel } from '@koakh/typescript-simple-logger';

export class App {
  // static
  public static log(logLevel: LogLevel, message: string | object) {
    App.logger.log(logLevel, message);
  }
  private static logger: Logger = new Logger(c.LOG_LEVEL, c.LOG_FILE_PATH);

  constructor() {
    App.log(LogLevel.INFO, 'some message');
  }
}

// init App
export default new App();
```
