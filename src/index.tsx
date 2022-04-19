import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import startServiceWorker from './utils/startServiceWorker';

import App from './components/App';
import './index.css';

startServiceWorker();

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
