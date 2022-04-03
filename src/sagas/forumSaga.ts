import {
  all,
  put,
  takeLatest,
} from 'redux-saga/effects';

import forumData from '../_demodata/forum';

import {
  getThread,
  getThreads,
} from '../store/forum';

type ForumAction<T> = Action<T>;

function* getThreadsWorker() {
  const { success, fulfill, failure } = getThreads;

  try {
    const data = forumData;
    yield put(success({ data }));
  } catch (error) {
    yield put(failure({ error }));
  } finally {
    yield put(fulfill());
  }
}

function* getThreadWorker(action: ForumAction<number | null>) {
  const { success, fulfill, failure } = getThread;

  try {
    const current = action.payload
      ? forumData.find((thread) => thread.id === action.payload)
      : null;

    yield put(success({ current }));
  } catch (error) {
    yield put(failure({ error }));
  } finally {
    yield put(fulfill());
  }
}

export default function* forumWatcher() {
  yield all([
    takeLatest(getThread.TRIGGER, getThreadWorker),
    takeLatest(getThreads.TRIGGER, getThreadsWorker),
  ]);
}
