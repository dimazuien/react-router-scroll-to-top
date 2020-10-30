# react-router-scroll-to-top

[![npm Version](https://img.shields.io/npm/v/react-router-scroll-to-top.svg?style=flat-square)](https://www.npmjs.com/package/react-router-scroll-to-top)

ScrollToTop is a React component that scrolls to the top of a page when the current location gets changed. Since React Router doesn't provide out-of-the-box support for scroll restoration due to [browsers having started handling it on their own](https://majido.github.io/scroll-restoration-proposal/history-based-api.html), this package implements a component for scrolling to top manually as it is given in [React Router docs](https://reactrouter.com/web/guides/scroll-restoration#scroll-restoration-scroll-to-top).

## Installation

```shell
npm install react-router-scroll-to-top
```

## Usage

```jsx
import ScrollToTop from 'react-router-scroll-to-top';

// wrap app components with ScrollToTop
const App = () => (
  <Router>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>
);

// or just render it bare
const App = () => (
  <Router>
    <ScrollToTop />
    <App />
  </Router>
);
```

This package works only in versions of React that support hooks.
