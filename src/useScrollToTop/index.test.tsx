import {
  render as rtlRender,
  renderHook as rtlRenderHook,
  RenderOptions,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactElement } from 'react';
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import useScrollToTop from '.';

const render = (element: ReactElement, options?: RenderOptions) =>
  rtlRender(element, { wrapper: MemoryRouter, ...options });

const renderHook = (hook: typeof useScrollToTop, options?: RenderOptions) =>
  rtlRenderHook(hook, { wrapper: MemoryRouter, ...options });

describe('useScrollToTop', () => {
  const user = userEvent.setup();

  it('should trigger scrolling to top when the app is rendered', () => {
    expect.assertions(2);

    const spy = jest.spyOn(window, 'scrollTo');

    renderHook(useScrollToTop);

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);

    spy.mockClear();
  });

  it('should trigger scrolling to top when redirected after link click', async () => {
    expect.assertions(2);

    function Page() {
      return <Link to="/another-page">Link</Link>;
    }
    function AnotherPage() {
      return <div>Hello, world!</div>;
    }
    function App() {
      useScrollToTop();

      return (
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/another-page" element={<AnotherPage />} />
        </Routes>
      );
    }

    const spy = jest.spyOn(window, 'scrollTo');

    render(<App />);

    await user.click(screen.getByRole('link'));

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);

    spy.mockClear();
  });

  it('should not trigger scrolling to top when redirected after link click with false "scrollToTop"', async () => {
    expect.assertions(1);

    function Page() {
      return (
        <Link to="/another-page" state={{ scrollToTop: false }}>
          Link
        </Link>
      );
    }
    function AnotherPage() {
      return <div>Hello, world!</div>;
    }
    function App() {
      useScrollToTop();

      return (
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/another-page" element={<AnotherPage />} />
        </Routes>
      );
    }

    const spy = jest.spyOn(window, 'scrollTo');

    render(<App />);

    await user.click(screen.getByRole('link'));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    spy.mockClear();
  });

  it('should trigger scrolling to top when redirected by using "history.navigate"', async () => {
    expect.assertions(2);

    function Page() {
      const navigate = useNavigate();

      return (
        <button
          type="button"
          onClick={() => {
            navigate('/another-page');
          }}
        >
          Button
        </button>
      );
    }
    function AnotherPage() {
      return <div>Hello, world!</div>;
    }
    function App() {
      useScrollToTop();

      return (
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/another-page" element={<AnotherPage />} />
        </Routes>
      );
    }

    const spy = jest.spyOn(window, 'scrollTo');

    render(<App />);

    await user.click(screen.getByRole('button'));

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);

    spy.mockClear();
  });

  it('should not trigger scrolling to top when redirected by using "history.navigate" with false "scrollToTop"', async () => {
    expect.assertions(1);

    function Page() {
      const navigate = useNavigate();

      return (
        <button
          type="button"
          onClick={() => {
            navigate('/another-page', { state: { scrollToTop: false } });
          }}
        >
          Button
        </button>
      );
    }
    function AnotherPage() {
      return <div>Hello, world!</div>;
    }
    function App() {
      useScrollToTop();

      return (
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/another-page" element={<AnotherPage />} />
        </Routes>
      );
    }

    const spy = jest.spyOn(window, 'scrollTo');

    render(<App />);

    await user.click(screen.getByRole('button'));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    spy.mockClear();
  });
});
