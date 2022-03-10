import { call, put, takeLatest } from 'redux-saga/effects';
import type { TakeableChannel } from 'redux-saga';

import {
  signUp,
  signIn,
  signOut,
  storeUser,
} from '../store/user';
import authService from '../services/auth';

function* signUpWorker(action: { type: string, payload: Record<string, unknown> }) {
  const { success, fulfill } = signUp;

  try {
    yield call([authService, authService.signUp], action.payload);
    const { data } = yield call([authService, authService.getData]);

    yield put(success({ data }));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

function* signInWorker(action: { type: string, payload: Record<string, unknown> }) {
  const { success, fulfill } = signIn;

  try {
    yield call([authService, authService.signIn], action.payload);

    const { data } = yield call([authService, authService.getData]);

    yield put(success({ data }));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

function* storeUserWorker() {
  const { success, fulfill } = signIn;

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
  const { success, fulfill } = signOut;

  try {
    yield call([authService, authService.signOut]);
    yield put(success({ data: null }));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

export default function* userWatcher() {
  yield takeLatest(signUp.TRIGGER as unknown as TakeableChannel<unknown>, signUpWorker);
  yield takeLatest(signIn.TRIGGER as unknown as TakeableChannel<unknown>, signInWorker);
  yield takeLatest(storeUser.TRIGGER as unknown as TakeableChannel<unknown>, storeUserWorker);
  yield takeLatest(signOut.TRIGGER as unknown as TakeableChannel<unknown>, signOutWorker);
}
