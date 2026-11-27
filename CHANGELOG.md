## [2.0.0](https://github.com/dimazuien/react-router-scroll-to-top/compare/v1.3.0...v2.0.0) (2026-11-27)

### ⚠ BREAKING CHANGES

- The build targets the browsers that Baseline lists as widely available, Chrome 125, Edge 125, Firefox 126, and Safari 17.5 today, instead of ES2020. The target moves forward with Baseline.
- The package needs react-router 7 or 8 and React 18 or 19. Apps on React Router 5.1 or 6 should stay on version 1. React Router 7 apps that import from react-router-dom need react-router as a direct dependency too.
- The exports map exposes only the root entry point and package.json, so deep imports no longer resolve. The UMD bundle in lib/ and the root index.d.ts are gone, and the code now targets ES2020 instead of ES5.

### Features

- support React Router 8 ([a5c7c0c](https://github.com/dimazuien/react-router-scroll-to-top/commit/a5c7c0c6cc3efedc2814003be2a8b959db6f37af))

### Build System

- ship ESM and CommonJS builds with an exports map ([2dd464e](https://github.com/dimazuien/react-router-scroll-to-top/commit/2dd464e592654c0c818588908adcff6fa95f506c))
- target Baseline widely available browsers ([612f3e5](https://github.com/dimazuien/react-router-scroll-to-top/commit/612f3e546fc51c36ca2923505d57e8d211d5d495))

## [1.3.0](https://github.com/dimazuien/react-router-scroll-to-top/compare/v1.2.1...v1.3.0) (2026-11-27)

### Features

- support React 19 ([460d773](https://github.com/dimazuien/react-router-scroll-to-top/commit/460d7735cb752be06b3f2a76b312a66744c4a409))
- support React Router 7 ([48d337c](https://github.com/dimazuien/react-router-scroll-to-top/commit/48d337cf35bbdaf1541ad8f2c2e011ddab4d1416))

## [1.2.1](https://github.com/dimazuien/react-router-scroll-to-top/compare/v1.2.0...v1.2.1) (2023-07-31)

### Bug Fixes

- change webpack config to build nodejs-compatible bundle ([97b4245](https://github.com/dimazuien/react-router-scroll-to-top/commit/97b4245d1ecdcc93ad0f8285a946fd6b7ae8792d))

# [1.2.0](https://github.com/dimazuien/react-router-scroll-to-top/compare/v1.1.2...v1.2.0) (2022-04-03)

### Features

- add support for react 18 ([94eeccd](https://github.com/dimazuien/react-router-scroll-to-top/commit/94eeccd9efe629769c2db4c46c358469fcdece01))

## [1.1.2](https://github.com/dimazuien/react-router-scroll-to-top/compare/v1.1.1...v1.1.2) (2021-02-22)

### Bug Fixes

- change typings path ([e39b991](https://github.com/dimazuien/react-router-scroll-to-top/commit/e39b99118ba22f3c2f77789f1f57efd742b98dce))

## [1.1.1](https://github.com/dimazuien/react-router-scroll-to-top/compare/v1.1.0...v1.1.1) (2020-12-28)

### Bug Fixes

- make ScrollToTop named export (before was default) ([ddfa28a](https://github.com/dimazuien/react-router-scroll-to-top/commit/ddfa28ad099606743c155ce833069dd231ab3c29))

# [1.1.0](https://github.com/dimazuien/react-router-scroll-to-top/compare/v1.0.0...v1.1.0) (2020-12-27)

### Features

- add a hook ([587ce84](https://github.com/dimazuien/react-router-scroll-to-top/commit/587ce8469b62491097541687d38810870abc6ae5))
- add state param that prevents scrolling to top ([a77830c](https://github.com/dimazuien/react-router-scroll-to-top/commit/a77830cef6ca582dad34f9130cb4068cb88c9f83))
