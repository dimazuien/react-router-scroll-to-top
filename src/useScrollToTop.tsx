import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type ScrollToTopState =
  | Readonly<{
      scrollToTop?: boolean;
    }>
  | undefined;

const useScrollToTop = (): void => {
  const { pathname, state } = useLocation<ScrollToTopState>();

  useEffect(() => {
    if (state?.scrollToTop === false) return;

    window.scrollTo(0, 0);
  }, [pathname, state]);
};

export default useScrollToTop;
