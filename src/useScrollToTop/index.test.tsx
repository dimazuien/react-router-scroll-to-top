import {
  render as rtlRender,
  renderHook as rtlRenderHook,
  type RenderOptions,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
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

const AnotherPage = () => <div>Hello, world!</div>;

describe('useScrollToTop', () => {
  const user = userEvent.setup();
  const scrollTo = vi.spyOn(window, 'scrollTo');

  it('should trigger scrolling to top when the app is rendered', () => {
    renderHook(useScrollToTop);

    expect(scrollTo).toHaveBeenCalledExactlyOnceWith(0, 0);
  });

  it('should trigger scrolling to top when redirected after link click', async () => {
    const Page = () => <Link to='/another-page'>Link</Link>;
    const App = () => {
      useScrollToTop();

      return (
        <Routes>
          <Route path='/' element={<Page />} />
          <Route path='/another-page' element={<AnotherPage />} />
        </Routes>
      );
    };

    render(<App />);

    await user.click(screen.getByRole('link'));

    expect(scrollTo).toHaveBeenCalledTimes(2);
    expect(scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it('should not trigger scrolling to top when redirected after link click with false "scrollToTop"', async () => {
    const Page = () => (
      <Link to='/another-page' state={{ scrollToTop: false }}>
        Link
      </Link>
    );
    const App = () => {
      useScrollToTop();

      return (
        <Routes>
          <Route path='/' element={<Page />} />
          <Route path='/another-page' element={<AnotherPage />} />
        </Routes>
      );
    };

    render(<App />);

    await user.click(screen.getByRole('link'));

    expect(scrollTo).toHaveBeenCalledOnce();
  });

  it('should trigger scrolling to top when redirected by using "history.navigate"', async () => {
    const Page = () => {
      const navigate = useNavigate();

      return (
        <button
          type='button'
          onClick={() => {
            navigate('/another-page');
          }}
        >
          Button
        </button>
      );
    };
    const App = () => {
      useScrollToTop();

      return (
        <Routes>
          <Route path='/' element={<Page />} />
          <Route path='/another-page' element={<AnotherPage />} />
        </Routes>
      );
    };

    render(<App />);

    await user.click(screen.getByRole('button'));

    expect(scrollTo).toHaveBeenCalledTimes(2);
    expect(scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it('should not trigger scrolling to top when redirected by using "history.navigate" with false "scrollToTop"', async () => {
    const Page = () => {
      const navigate = useNavigate();

      return (
        <button
          type='button'
          onClick={() => {
            navigate('/another-page', { state: { scrollToTop: false } });
          }}
        >
          Button
        </button>
      );
    };
    const App = () => {
      useScrollToTop();

      return (
        <Routes>
          <Route path='/' element={<Page />} />
          <Route path='/another-page' element={<AnotherPage />} />
        </Routes>
      );
    };

    render(<App />);

    await user.click(screen.getByRole('button'));

    expect(scrollTo).toHaveBeenCalledOnce();
  });
});
