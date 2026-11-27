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

- pnpm:

```shell
pnpm add react-router-scroll-to-top
```

It needs React 18 or 19 and React Router 7 or 8, and it imports from the `react-router` package. If your app imports from `react-router-dom` on React Router 7, add `react-router` as a direct dependency too, at the same version. For React Router 5.1 or 6, use version 1 of this package.

It works in React Router's declarative mode (`<BrowserRouter>`). With a data router or in framework mode, use React Router's [`<ScrollRestoration>`](https://reactrouter.com/api/components/ScrollRestoration) instead.

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

That's it. The package doesn't demand you to do anything else. Just keep using React Router as before.

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
