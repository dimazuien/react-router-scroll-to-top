import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = (): void => {
  const location = useLocation();
  const { pathname } = location;
  const state = location.state as
    | Readonly<{ scrollToTop?: boolean }>
    | undefined;

  useEffect(() => {
    if (state?.scrollToTop === false) return;

    window.scrollTo(0, 0);
  }, [pathname, state]);
};

export default useScrollToTop;
