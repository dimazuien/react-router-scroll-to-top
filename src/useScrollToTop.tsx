import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = (): void => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.scrollToTop === false) return;

    window.scrollTo(0, 0);
  }, [pathname, state]);
};

export default useScrollToTop;
