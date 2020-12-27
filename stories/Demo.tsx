import 'github-markdown-css';
import { LoremIpsum } from 'lorem-ipsum';
import React, { FC } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import ScrollToTop from '../src/ScrollToTop';

type PageFactoryProps = Readonly<{
  currentPageTitle: string;
  anotherPageTitle: string;
  anotherPagePath: string;
}>;

const lorem = new LoremIpsum();
const text = lorem.generateParagraphs(30);

const PageFactory = ({
  currentPageTitle,
  anotherPageTitle,
  anotherPagePath,
}: PageFactoryProps): FC => () => {
  const { push } = useHistory();

  return (
    <main className="markdown-body">
      <h1>{currentPageTitle}</h1>
      <Link to={anotherPagePath}>Link to {anotherPageTitle}</Link>
      <br />
      <Link to={{ pathname: anotherPagePath, state: { scrollToTop: false } }}>
        Link to {anotherPageTitle} (with disabled scrolling to top)
      </Link>
      <br />
      <button type="button" onClick={() => push(anotherPagePath)}>
        Button that redirects to {anotherPageTitle}
      </button>
      <br />
      <button
        type="button"
        onClick={() => push(anotherPagePath, { scrollToTop: false })}
      >
        Button that redirects to {anotherPageTitle} (with disabled scrolling to
        top)
      </button>
      <br />
      * there also are the same links and buttons at the bottom of the page
      <br />
      {text}
      <br />
      <Link to={anotherPagePath}>{anotherPageTitle}</Link>
      <br />
      <Link to={{ pathname: anotherPagePath, state: { scrollToTop: false } }}>
        {anotherPageTitle} (with disabled scrolling to top)
      </Link>
      <br />
      <button type="button" onClick={() => push(anotherPagePath)}>
        Button that redirects to {anotherPageTitle}
      </button>
      <br />
      <button
        type="button"
        onClick={() => push(anotherPagePath, { scrollToTop: false })}
      >
        Button that redirects to {anotherPageTitle} (with disabled scrolling to
        top)
      </button>
    </main>
  );
};

const Demo: FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Switch>
      <Route
        path="/another-page"
        component={PageFactory({
          currentPageTitle: 'Page 2',
          anotherPageTitle: 'Page 1',
          anotherPagePath: '/',
        })}
      />
      <Route
        path="/"
        component={PageFactory({
          currentPageTitle: 'Page 1',
          anotherPageTitle: 'Page 2',
          anotherPagePath: '/another-page',
        })}
      />
    </Switch>
  </BrowserRouter>
);

export default Demo;
