import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immer';
import produce from 'immer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import user from './user/userStore';
import forum from './forum';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware({
  onError(error) {
    throw error;
  },
});

const rootReducer = combineReducers(produce, {
  user,
  forum,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
