import '@testing-library/jest-dom/extend-expect';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useCallback } from 'react';
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import ScrollToTop from '../src/ScrollToTop';

describe('ScrollToTop', () => {
  it('should trigger scrolling to top when the app is rendered', () => {
    function App() {
      return (
        <>
          <ScrollToTop />
          <div>Hello, world!</div>
        </>
      );
    }

    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it('should work if used as a wrapper', () => {
    window.scrollTo = jest.fn();

    const { baseElement } = render(
      <MemoryRouter>
        <ScrollToTop>
          <div>Hello, world!</div>
        </ScrollToTop>
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
    expect(baseElement).toContainHTML('<div>Hello, world!</div>');
  });

  it('should trigger scrolling to top when redirected after link click', async () => {
    function App() {
      const Page = useCallback(() => <Link to="/another-page">Link</Link>, []);
      const AnotherPage = useCallback(() => <div>Hello, world!</div>, []);

      return (
        <>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/another-page" element={<AnotherPage />} />
          </Routes>
        </>
      );
    }

    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(screen.getByRole('link'));

    await waitFor(() => expect(window.scrollTo).toHaveBeenCalledTimes(2));
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it('should not trigger scrolling to top when redirected after link click with false "scrollToTop"', () => {
    function App() {
      const Page = useCallback(
        () => (
          <Link to="/another-page" state={{ scrollToTop: false }}>
            Link
          </Link>
        ),
        [],
      );
      const AnotherPage = useCallback(() => <div>Hello, world!</div>, []);

      return (
        <>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/another-page" element={<AnotherPage />} />
          </Routes>
        </>
      );
    }

    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(screen.getByRole('link'));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it('should trigger scrolling to top when redirected by using "history.navigate"', async () => {
    function App() {
      const Page = useCallback(() => {
        const navigate = useNavigate();

        return (
          <button type="button" onClick={() => navigate('/another-page')}>
            Button
          </button>
        );
      }, []);
      const AnotherPage = useCallback(() => <div>Hello, world!</div>, []);

      return (
        <>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/another-page" element={<AnotherPage />} />
          </Routes>
        </>
      );
    }

    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(window.scrollTo).toHaveBeenCalledTimes(2));
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it('should not trigger scrolling to top when redirected by using "history.navigate" with false "scrollToTop"', () => {
    function App() {
      const Page = useCallback(() => {
        const navigate = useNavigate();

        return (
          <button
            type="button"
            onClick={() =>
              navigate('/another-page', { state: { scrollToTop: false } })
            }
          >
            Button
          </button>
        );
      }, []);
      const AnotherPage = useCallback(() => <div>Hello, world!</div>, []);

      return (
        <>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/another-page" element={<AnotherPage />} />
          </Routes>
        </>
      );
    }

    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(screen.getByRole('button'));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
