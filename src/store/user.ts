import { createReducer } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';

export type UserState = {
  data: Nullable<User>;
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
    return { ...state, data };
  },
  [signIn.SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return { ...state, data };
  },
  [signIn.FAILURE]: (state, action) => {
    const { error } = action.payload;
    console.log(error);
    return { ...state, error };
  },
  [storeUser.SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return { ...state, data };
  },
  [signOut.SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return { ...state, data };
  },
  [changeProfile.SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return { ...state, data };
  },
});

export default userReducer;
