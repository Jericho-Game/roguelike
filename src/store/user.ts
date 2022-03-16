import { createReducer } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';

export type UserState = {
  data: Nullable<User>;
  error?: string;
};

const initialState: UserState = {
  data: null,
};

export const signUp = createRoutine('user/SIGN_UP');
export const signIn = createRoutine('user/SIGN_IN');
export const storeUser = createRoutine('user/STORE_USER');
export const signOut = createRoutine('user/SIGN_OUT');
export const changeProfile = createRoutine('user/CHANGE_PROFILE');

const userReducer = createReducer(initialState, {
  [signUp.SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return { ...state, data, error: undefined };
  },
  [signUp.FAILURE]: (state, action) => {
    const error = action.payload;
    return { ...state, error };
  },
  [signIn.SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return { ...state, data, error: undefined };
  },
  [signIn.FAILURE]: (state, action) => {
    const error = action.payload;
    return { ...state, error };
  },
  [storeUser.SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return { ...state, data, error: undefined };
  },
  [signOut.SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return { ...state, data, error: undefined };
  },
  [changeProfile.SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return { ...state, data, error: undefined };
  },
  [changeProfile.FAILURE]: (state, action) => {
    const error = action.payload;
    return { ...state, error };
  },
});

export default userReducer;
