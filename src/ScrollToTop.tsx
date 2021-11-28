import React, { Children, ReactNode } from 'react';

import useScrollToTop from './useScrollToTop';

type Props = Readonly<{ children?: ReactNode }>;

function ScrollToTop({ children }: Props): JSX.Element {
  useScrollToTop();

  return <>{Children.toArray(children)}</>;
}

export default ScrollToTop;
