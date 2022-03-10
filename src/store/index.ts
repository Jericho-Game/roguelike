import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import user from './user';
import rootSaga from '../sagas/rootSaga';

// добавить sagaMiddleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

// добавить user reducer
const rootReducer = combineReducers({
  user,
});

// использовать middleware
const store = configureStore({
  reducer: rootReducer,
  middleware,
});

// и запустить корневую сагу
sagaMiddleware.run(rootSaga);

export default store;
