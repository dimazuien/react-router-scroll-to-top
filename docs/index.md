# Docs

## Installing

- npm:

```shell
npm install react-router-scroll-to-top
```

- yarn:

```shell
yarn add react-router-scroll-to-top
```

This package works only in versions of React that support hooks.

## Import

From the package you can import:

- a hook that activates scrolling to the top of a page on redirect:

```javascript
import { useScrollToTop } from 'react-router-scroll-to-top';
```

- a component that just runs the hook under the hood:

```javascript
import { ScrollToTop } from 'react-router-scroll-to-top';
```

## Setting up

- as a hook:

```jsx
const App = () => {
  useScrollToTop();

  return <Routes>{/* routes */}</Routes>;
};
```

An important note: don't use this hook in a component with a router (`BrowserRouter`, `MemoryRouter`, etc.).

- as a component (can be used in a component with a router):

```jsx
const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>{/* routes */}</Routes>
  </BrowserRouter>
);
```

or

```jsx
const App = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Routes>{/* routes */}</Routes>
    </ScrollToTop>
  </BrowserRouter>
);
```

## Usage

That's it. The package doesn't demand you to do anything else. Just keep using `react-router-dom` as before.

If in some cases you need to disable scrolling to the top of a page, pass `{ scrollToTop: false }` to the state:

```jsx
<Link to='/any-page' state={{ scrollToTop: false }}>
  Any page
</Link>
```

```javascript
const navigate = useNavigate();

navigate('/any-page', { state: { scrollToTop: false } });
```
