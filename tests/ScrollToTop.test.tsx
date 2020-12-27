import '@testing-library/jest-dom/extend-expect';
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
import ScrollToTop from '../src/ScrollToTop';

describe('ScrollToTop', () => {
  it('should trigger scrolling to top when the app is rendered', () => {
    const App: FC = () => (
      <>
        <ScrollToTop />
        <div>Hello, world!</div>
      </>
    );

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

  it('should trigger scrolling to top when redirected after link click', () => {
    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <ScrollToTop />
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
      </MemoryRouter>,
    );

    userEvent.click(screen.getByRole('link'));

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it('should not trigger scrolling to top when redirected after link click with false "scrollToTop"', () => {
    const App: FC = () => (
      <>
        <ScrollToTop />
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
      </>
    );

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
    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <ScrollToTop />
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
      </MemoryRouter>,
    );

    userEvent.click(screen.getByRole('button'));

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it('should not trigger scrolling to top when redirected by using "history.push" with false "scrollToTop"', () => {
    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <ScrollToTop />
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
      </MemoryRouter>,
    );

    userEvent.click(screen.getByRole('button'));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
