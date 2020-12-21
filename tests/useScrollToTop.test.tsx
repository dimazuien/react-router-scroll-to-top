import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { FC } from 'react';
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
    const App: FC = () => {
      useScrollToTop();

      return <div>Hello, world!</div>;
    };

    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it('should trigger scrolling to top when redirected after link click', () => {
    const App: FC = () => {
      useScrollToTop();

      return (
        <Switch>
          <Route
            path="/another-page"
            component={() => <div>Hello, world!</div>}
          />
          <Route
            path="/"
            component={() => <Link to="/another-page">Link</Link>}
          />
        </Switch>
      );
    };

    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(screen.getByRole('link'));

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it('should not trigger scrolling to top when redirected after link click with false "scrollToTop"', () => {
    const App: FC = () => {
      useScrollToTop();

      return (
        <Switch>
          <Route
            path="/another-page"
            component={() => <div>Hello, world!</div>}
          />
          <Route
            path="/"
            component={() => (
              <Link
                to={{
                  pathname: '/another-page',
                  state: { scrollToTop: false },
                }}
              >
                Link
              </Link>
            )}
          />
        </Switch>
      );
    };

    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(screen.getByRole('link'));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it('should trigger scrolling to top when redirected by using "history.push"', () => {
    const App: FC = () => {
      useScrollToTop();

      return (
        <Switch>
          <Route
            path="/another-page"
            component={() => <div>Hello, world!</div>}
          />
          <Route
            path="/"
            component={() => {
              const { push } = useHistory();

              return (
                <button type="button" onClick={() => push('/another-page')}>
                  Button
                </button>
              );
            }}
          />
        </Switch>
      );
    };

    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(screen.getByRole('button'));

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it('should not trigger scrolling to top when redirected by using "history.push" with false "scrollToTop"', () => {
    const App: FC = () => {
      useScrollToTop();

      return (
        <Switch>
          <Route
            path="/another-page"
            component={() => <div>Hello, world!</div>}
          />
          <Route
            path="/"
            component={() => {
              const { push } = useHistory();

              return (
                <button
                  type="button"
                  onClick={() => push('/another-page', { scrollToTop: false })}
                >
                  Button
                </button>
              );
            }}
          />
        </Switch>
      );
    };

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
