import { createStore, applyMiddleware } from 'redux';
import type { Store } from 'redux';
import { combineReducers } from 'redux-immer';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory, createMemoryHistory } from 'history';
import produce from 'immer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { END, SagaMiddleware } from 'redux-saga';

import rootSaga from '../sagas/rootSaga';
import isServer from '../utils/isServer';
import getInitialState from './initialState';
import type { State } from './initialState';
import user from './user';
import forum from './forum';

// global redeclared types
declare global {
  interface Window {
    __INITIAL_STATE__: State;
  }
}

// eslint-disable-next-line no-underscore-dangle
const initialState = getInitialState();

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: !isServer ? createBrowserHistory() : createMemoryHistory(),
});

const rootReducer = combineReducers(produce, {
  user,
  forum,
  router: routerReducer,
});

const sagaMiddleware = createSagaMiddleware({
  onError(error) {
    throw error;
  },
});
const middlewares = [routerMiddleware, sagaMiddleware];

type AppStore = Store<State> & {
  runSaga: SagaMiddleware['run'];
  close: () => void;
};

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares)),
) as AppStore;

if (!isServer) {
  sagaMiddleware.run(rootSaga);
}

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);

export const history = createReduxHistory(store);
