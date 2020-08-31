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
  // "@koakh/typescript-simple-logger": "^1.0.70",
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
