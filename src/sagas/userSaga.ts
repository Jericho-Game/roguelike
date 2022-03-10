import { call, put, takeLatest } from 'redux-saga/effects';

import {
  signUp,
  signIn,
  signOut,
  storeUser,
  changeProfile,
} from '../store/user';
import authService from '../services/auth';
import userService from '../services/user';

type UserAction = Action<User>;

function* signUpWorker(action: UserAction) {
  const { success, fulfill, failure } = signUp;

  try {
    yield call([authService, authService.signUp], action.payload);
    const { data } = yield call([authService, authService.getData]);

    yield put(success({ data }));
  } catch (error) {
    yield put(failure(error.message));
  } finally {
    yield put(fulfill());
  }
}

function* signInWorker(action: UserAction) {
  const { success, fulfill, failure } = signIn;

  try {
    yield call([authService, authService.signIn], action.payload);

    const { data, error } = yield call([authService, authService.getData]);

    console.log(error);

    yield put(success({ data }));
  } catch (error) {
    yield put(failure(error.message));
  } finally {
    yield put(fulfill());
  }
}

function* storeUserWorker() {
  const { success, fulfill, failure } = signIn;

  try {
    const { data } = yield call([authService, authService.getData]);

    yield put(success({ data }));
  } catch (error) {
    yield put(failure(error.message));
  } finally {
    yield put(fulfill());
  }
}

function* signOutWorker() {
  const { success, fulfill, failure } = signOut;

  try {
    yield call([authService, authService.signOut]);
    yield put(success({ data: null }));
  } catch (error) {
    yield put(failure(error.message));
  } finally {
    yield put(fulfill());
  }
}

function* changeProfileWorker(action: UserAction) {
  const { success, fulfill, failure } = changeProfile;

  try {
    const { data } = yield call([userService, userService.changeProfile], action.payload);

    console.log({ data });

    yield put(success({ data }));
  } catch (error) {
    yield put(failure(error.message));
  } finally {
    yield put(fulfill());
  }
}

export default function* userWatcher() {
  yield takeLatest(signUp.TRIGGER, signUpWorker);
  yield takeLatest(signIn.TRIGGER, signInWorker);
  yield takeLatest(storeUser.TRIGGER, storeUserWorker);
  yield takeLatest(signOut.TRIGGER, signOutWorker);
  yield takeLatest(changeProfile.TRIGGER, changeProfileWorker);
}
