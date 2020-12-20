import { fireEvent, render } from '@testing-library/react';
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
  it('should be defined', () => {
    expect(useScrollToTop).toBeDefined();
  });

  it('should be called when the app is rendered', () => {
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

    expect((window.scrollTo as jest.Mock).mock.calls.length).toBe(1);
    expect((window.scrollTo as jest.Mock).mock.calls[0]).toEqual([0, 0]);
  });

  it('should be called when redirected after link click', () => {
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
              <Link to="/another-page" data-testid="link">
                Link
              </Link>
            )}
          />
        </Switch>
      );
    };

    window.scrollTo = jest.fn();

    const app = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent(
      app.getByTestId('link'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect((window.scrollTo as jest.Mock).mock.calls.length).toBe(2);
    expect((window.scrollTo as jest.Mock).mock.calls[1]).toEqual([0, 0]);
  });

  it('should not be called when redirected after link click with false "scrollToTop"', () => {
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
                data-testid="link"
              >
                Link
              </Link>
            )}
          />
        </Switch>
      );
    };

    window.scrollTo = jest.fn();

    const app = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent(
      app.getByTestId('link'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect((window.scrollTo as jest.Mock).mock.calls.length).toBe(1);
  });

  it('should be called when redirected by using "history.push"', () => {
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
                  onClick={() => push('/another-page')}
                  data-testid="button"
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

    const app = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent(
      app.getByTestId('button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect((window.scrollTo as jest.Mock).mock.calls.length).toBe(2);
    expect((window.scrollTo as jest.Mock).mock.calls[1]).toEqual([0, 0]);
  });

  it('should not be called when redirected by using "history.push" with false "scrollToTop"', () => {
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
                  data-testid="button"
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

    const app = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent(
      app.getByTestId('button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect((window.scrollTo as jest.Mock).mock.calls.length).toBe(1);
  });
});
