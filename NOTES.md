# NOTES

## Notes

> when we develop in `local-modules` folder, ex in `TypeScriptNodeExpressStarterSimplified/local-modules/@koakh/typescript-simple-logger` project
we must have package outside of `TypeScriptNodeExpressStarterSimplified` folder ex in `/home/mario/Development/@Koakh/packages/@koakh/typescript-simple-logger` folder to prevent compilation problems when use use `tsc`

> to use it in `TypeScriptNodeExpressStarterSimplified` folder add a symbolic link to module folder and add it to `package.json` with `"@koakh/typescript-simple-logger": "file:local-modules/@koakh/typescript-simple-logger"`

> when change something in module don't forget to build it with `npm run pck:typescript-simple-logger:build`

## Use in package.json

```json
{
  // use npm package
  // "@koakh/typescript-simple-logger": "^1.1.3",
  // use local node module (development)
  "@koakh/typescript-simple-logger": "file:local-modules/@koakh/typescript-simple-logger",
}
```

## Build and Publish

```shell
# first login to npm registry
$ npm login

# enter path
$ cd local-modules/@koakh/typescript-simple-logger

# build
$ npm run build
# patch (update readme and bump version)
$ npm run patch
# publish
$ npm run publish
```

## ANSI Colors

- [Remove all ANSI colors/styles from strings](https://stackoverflow.com/questions/25245716/remove-all-ansi-colors-styles-from-strings/29497680)
- [GitHub - chalk/strip-ansi: Strip ANSI escape codes from a string](https://github.com/chalk/strip-ansi)
- [How to remove / replace ANSI color codes from a string in Javascript](https://stackoverflow.com/questions/7149601/how-to-remove-replace-ansi-color-codes-from-a-string-in-javascript/7150870)

```javascript
$ node

x = "\033[1mHello Bold World!\033[0m\n";
// y = x.replace(/\033\[[0-9;]*m/,"").replace(/\033\[[0-9;]*m/,"");
// with /g will replace all
y = x.replace(/\033\[[0-9;]*m/g,"");
print(x);
Hello Bold World!\n

x = "\u001b[0;1;31mfailed to set time zone: access denied\u001b[0m"
y = x.replace(/\033\[[0-9;]*m/g,"");
'failed to set time zone: access denied'
```


x = ["\u001b[0;1;31mfailed to set time zone: access denied 1\u001b[0m", "\u001b[0;1;31mfailed to set time zone: access denied 2\u001b[0m"]

y = x.replace(/\033\[[0-9;]*m/g,"");