import { Request, Response } from 'express';

import { renderToString } from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import { Provider as ReduxProvider } from 'react-redux';
import Helmet from 'react-helmet';
import type { HelmetData } from 'react-helmet';

import App from '../App';
import { store } from '../store';
import rootSaga from '../sagas/rootSaga';
import type { State } from '../store/initialState';
import routes from '../routes';

function getHtml(reactHtml: string, reduxState: State, helmetData: HelmetData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        ${helmetData.title.toString()}
        ${helmetData.meta.toString()}
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.jpg">
        <link href="/main.css" rel="stylesheet">
    </head>
    <body>
        <div id="app">${reactHtml}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
        </script>
        <script src="/bundle.js"></script>
    </body>
    </html>
    `;
}

export default (req: Request, res: Response) => {
  store
    .runSaga(rootSaga)
    .toPromise()
    .then(() => {
      const location = req.url;
      const initialState = store.getState();
      const helmetData = Helmet.renderStatic();
      const reactHtml = renderToString((
        <ReduxProvider store={store}>
          <StaticRouter location={location}>
            <App />
          </StaticRouter>
        </ReduxProvider>
      ));
      res.send(getHtml(reactHtml, initialState, helmetData));
    })
    .catch((err) => { throw err; });

  const dataRequirements: (Promise<void> | void)[] = routes
    .map((route) => {
      const { fetchData: fetchMethod } = route;
      const match = matchPath(
        route.path,
        req.originalUrl,
      );

      if (match && fetchMethod) {
        return fetchMethod({
          dispatch: store.dispatch,
          match,
        });
      }

      return undefined;
    });

  return Promise.all(dataRequirements)
    .then(() => store.close())
    .catch((err) => { throw err; });
};
