import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store, history } from './store';
import startServiceWorker from './utils/startServiceWorker';

import App from './App';
import './index.css';

startServiceWorker();

ReactDOM.hydrate(
  <StrictMode>
    <Provider store={store}>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('app'),
);
