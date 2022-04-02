import { createRoutine } from 'redux-saga-routines';

export type UserState = {
  data: Nullable<User>;
  error: Nullable<Error>;
};

const initialState: UserState = {
  data: null,
  error: null,
};

export const signUp = createRoutine('user/SIGN_UP');
export const signIn = createRoutine('user/SIGN_IN');
export const storeUser = createRoutine('user/STORE_USER');
export const signOut = createRoutine('user/SIGN_OUT');
export const changeProfile = createRoutine('user/CHANGE_PROFILE');

const userReducer: Reducer<UserState> = (
  state = initialState,
  { type, payload } = { type: '', payload: initialState },
) => {
  switch (type) {
    case signUp.SUCCESS:
      state.data = payload.data;
      return state;
    case signUp.FAILURE:
      state.error = payload.error;
      return state;
    case signIn.SUCCESS:
      state.data = payload.data;
      return state;
    case signIn.FAILURE:
      state.error = payload.error;
      return state;
    case storeUser.SUCCESS:
      state.data = payload.data;
      return state;
    case storeUser.FAILURE:
      state.error = payload.error;
      return state;
    case signOut.SUCCESS:
      state.data = payload.data;
      return state;
    case changeProfile.SUCCESS:
      state.data = payload.data;
      return state;
    case changeProfile.FAILURE:
      state.error = payload.error;
      return state;
    default:
      return state;
  }
};

export default userReducer;
