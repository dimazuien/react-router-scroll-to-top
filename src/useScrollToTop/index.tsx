import { useEffect } from 'react';
import { useLocation } from 'react-router';

const useScrollToTop = (): void => {
  const location = useLocation();
  const { pathname } = location;
  // React Router types location.state as `any`, and it's null unless a navigation set it.
  const state = location.state as Readonly<{ scrollToTop?: boolean }> | null;

  useEffect(() => {
    if (state?.scrollToTop === false) return;

    window.scrollTo(0, 0);
  }, [pathname, state]);
};

export default useScrollToTop;
