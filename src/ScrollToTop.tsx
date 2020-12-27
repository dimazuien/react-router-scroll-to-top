import React, { FC } from 'react';
import useScrollToTop from './useScrollToTop';

const ScrollToTop: FC = ({ children }) => {
  useScrollToTop();

  return <>{children}</>;
};

export default ScrollToTop;
