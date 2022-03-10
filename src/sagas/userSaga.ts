import { call, put, takeLatest } from 'redux-saga/effects';
import type { TakeableChannel } from 'redux-saga';

import { signIn, signOut, storeUser } from '../store/user';
import authService from '../services/auth';

function* signInWorker(action: { type: string, payload: Record<string, unknown> }) {
  const { login, password } = action.payload;
  const { success, fulfill } = signIn;

  try {
    yield call([authService, authService.signIn], { login, password });

    yield put(success({ isAuthorized: true }));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

// worker
function* setUserWorker() {
  const { success, fulfill } = storeUser;

  try {
    const { data } = yield call([authService, authService.getData]);
    yield put(success({ data }));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

function* signOutWorker() {
  const { success, fulfill } = storeUser;

  try {
    yield call([authService, authService.signOut]);
    yield put(success({ isAuthorized: false, data: null }));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

// watcher
export default function* userWatcher() {
  yield takeLatest(signOut.TRIGGER as unknown as TakeableChannel<unknown>, signOutWorker);
  yield takeLatest(storeUser.TRIGGER as unknown as TakeableChannel<unknown>, setUserWorker);
  yield takeLatest(signIn.TRIGGER as unknown as TakeableChannel<unknown>, signInWorker);
}
