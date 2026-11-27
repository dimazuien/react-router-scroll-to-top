# react-router-scroll-to-top

[![npm Version](https://img.shields.io/npm/v/react-router-scroll-to-top.svg)](https://www.npmjs.com/package/react-router-scroll-to-top)
![npm downloads per week](https://img.shields.io/npm/dw/react-router-scroll-to-top)
![Minified size](https://img.shields.io/bundlephobia/min/react-router-scroll-to-top)
[![Open issues](https://img.shields.io/github/issues-raw/dimazuien/react-router-scroll-to-top)](https://github.com/dimazuien/react-router-scroll-to-top/issues)
[![Open pull requests](https://img.shields.io/github/issues-pr-raw/dimazuien/react-router-scroll-to-top)](https://github.com/dimazuien/react-router-scroll-to-top/pulls)
[![GitHub Stars](https://img.shields.io/github/stars/dimazuien/react-router-scroll-to-top)](https://github.com/dimazuien/react-router-scroll-to-top/stargazers)
![CI status](https://img.shields.io/github/actions/workflow/status/dimazuien/react-router-scroll-to-top/ci.yml?branch=main&label=ci)
![Code scanning](https://img.shields.io/github/actions/workflow/status/dimazuien/react-router-scroll-to-top/codeql-analysis.yml?branch=main)

ScrollToTop is a React component that scrolls to the top of the page when the location changes. It's for apps that use React Router 5.1 to 7 in declarative mode, with `<BrowserRouter>`, where React Router has no built-in scroll handling.

If your app uses a data router (`createBrowserRouter` with `<RouterProvider>`) or framework mode, use React Router's [`<ScrollRestoration>`](https://reactrouter.com/7.18.7/api/components/ScrollRestoration) instead. It also restores the scroll position when users go back or forward.

## Usage

```shell
npm install react-router-scroll-to-top
```

```jsx
import { ScrollToTop } from 'react-router-scroll-to-top';

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>{/* routes */}</Routes>
  </BrowserRouter>
);
```

Read [the documentation](https://github.com/dimazuien/react-router-scroll-to-top/blob/main/docs/index.md) for more details. You can also play with a [demo](https://codesandbox.io/s/react-router-scroll-to-top-n1mg3).
