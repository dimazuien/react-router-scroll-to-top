import '@testing-library/jest-dom/extend-expect';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useCallback } from 'react';
import {
  Link,
  MemoryRouter,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';

import useScrollToTop from '../src/useScrollToTop';

describe('useScrollToTop', () => {
  it('should trigger scrolling to top when the app is rendered', () => {
    function App() {
      useScrollToTop();

      return <div>Hello, world!</div>;
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

  it('should trigger scrolling to top when redirected after link click', async () => {
    function App() {
      const Page = useCallback(() => <Link to="/another-page">Link</Link>, []);
      const AnotherPage = useCallback(() => <div>Hello, world!</div>, []);

      useScrollToTop();

      return (
        <Switch>
          <Route path="/" component={Page} />
          <Route path="/another-page" component={AnotherPage} />
        </Switch>
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
          <Link
            to={{
              pathname: '/another-page',
              state: { scrollToTop: false },
            }}
          >
            Link
          </Link>
        ),
        [],
      );
      const AnotherPage = useCallback(() => <div>Hello, world!</div>, []);

      useScrollToTop();

      return (
        <Switch>
          <Route path="/" component={Page} />
          <Route path="/another-page" component={AnotherPage} />
        </Switch>
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

  it('should trigger scrolling to top when redirected by using "history.push"', async () => {
    function App() {
      const Page = useCallback(() => {
        const { push } = useHistory();

        return (
          <button type="button" onClick={() => push('/another-page')}>
            Button
          </button>
        );
      }, []);
      const AnotherPage = useCallback(() => <div>Hello, world!</div>, []);

      useScrollToTop();

      return (
        <Switch>
          <Route path="/" component={Page} />
          <Route path="/another-page" component={AnotherPage} />
        </Switch>
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

  it('should not trigger scrolling to top when redirected by using "history.push" with false "scrollToTop"', () => {
    function App() {
      const Page = useCallback(() => {
        const { push } = useHistory();

        return (
          <button
            type="button"
            onClick={() => push('/another-page', { scrollToTop: false })}
          >
            Button
          </button>
        );
      }, []);
      const AnotherPage = useCallback(() => <div>Hello, world!</div>, []);

      useScrollToTop();

      return (
        <Switch>
          <Route path="/" component={Page} />
          <Route path="/another-page" component={AnotherPage} />
        </Switch>
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
