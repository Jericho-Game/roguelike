import { createReducer } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';

export type UserState = {
  isAuthorized: boolean;
  data: Nullable<User>;
};

const initialState: UserState = {
  isAuthorized: false,
  data: null,
};

export const signIn = createRoutine('user/SIGN_IN');
export const storeUser = createRoutine('user/STORE_USER');
export const signOut = createRoutine('user/SIGN_OUT');

const userReducer = createReducer(initialState, {
  [signIn.SUCCESS]: (state, action) => {
    const { isAuthorized } = action.payload;
    return { ...state, isAuthorized };
  },
  [storeUser.SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return { ...state, data };
  },
  [signOut.SUCCESS]: (state, action) => {
    const { isAuthorized, data } = action.payload;
    console.log(isAuthorized, data);
    return { ...state, isAuthorized, data };
  },
});

export default userReducer;
