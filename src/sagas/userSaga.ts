import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

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
    yield put(failure({ error }));
  } finally {
    yield put(fulfill());
  }
}

function* signInWorker(action: UserAction) {
  const { success, fulfill, failure } = signIn;

  try {
    yield call([authService, authService.signIn], action.payload);
    const { data } = yield call([authService, authService.getData]);

    yield put(success({ data }));
  } catch (error) {
    yield put(failure({ error }));
  } finally {
    yield put(fulfill());
  }
}

function* storeUserWorker() {
  const { success, fulfill, failure } = signIn;

  try {
    const { data } = yield call([authService, authService.getData]);

    data.avatar = data?.avatar ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}` : undefined;
    yield put(success({ data }));
  } catch (error) {
    yield put(failure({ error }));
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
    yield put(failure({ error }));
  } finally {
    yield put(fulfill());
  }
}

function* changeProfileWorker(action: UserAction) {
  const { success, fulfill, failure } = changeProfile;

  try {
    const { data } = yield call([userService, userService.changeProfile], action.payload);
    yield put(success({ data }));
  } catch (error) {
    yield put(failure({ error }));
  } finally {
    yield put(fulfill());
  }
}

export default function* userWatcher() {
  yield all([
    takeLatest(signUp.TRIGGER, signUpWorker),
    takeLatest(signIn.TRIGGER, signInWorker),
    takeLatest(storeUser.TRIGGER, storeUserWorker),
    takeLatest(signOut.TRIGGER, signOutWorker),
    takeLatest(changeProfile.TRIGGER, changeProfileWorker),
  ]);
}
