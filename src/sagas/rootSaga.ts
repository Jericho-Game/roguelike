import { all } from 'redux-saga/effects';
import userWatcher from './userSaga';
import forumWatcher from './forumSaga';

export default function* rootSaga() {
  yield all([
    userWatcher(),
    forumWatcher(),
  ]);
}
