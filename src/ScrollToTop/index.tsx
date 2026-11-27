import { Children, type ReactElement, type ReactNode } from 'react';

import useScrollToTop from '../useScrollToTop';

type Props = Readonly<{ children?: ReactNode }>;

const ScrollToTop = ({ children }: Props): ReactElement => {
  useScrollToTop();

  return <>{Children.toArray(children)}</>;
};

export default ScrollToTop;
