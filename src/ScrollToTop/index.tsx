import {
  Children,
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
} from 'react';

import useScrollToTop from '../useScrollToTop';

type Props = Readonly<{ children?: ReactNode }>;

// createElement instead of JSX keeps React's JSX runtime out of the bundle.
function ScrollToTop({ children }: Props): ReactElement {
  useScrollToTop();

  return createElement(Fragment, null, Children.toArray(children));
}

export default ScrollToTop;
