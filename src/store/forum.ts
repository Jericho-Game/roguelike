import { createReducer } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';

export type ForumState = {
  data: Nullable<Thread[]>;
  current: Nullable<Thread>;
  error?: string;
};

const initialState: ForumState = {
  data: null,
  current: null,
};

export const getThreads = createRoutine('forum/GET_THREADS');
export const getThread = createRoutine('user/GET_THREAD');

const forumReducer = createReducer(initialState, {
  [getThreads.SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      data,
      current: null,
      error: undefined,
    };
  },
  [getThread.SUCCESS]: (state, action) => {
    const { current } = action.payload;
    return { ...state, current, error: undefined };
  },
});

export default forumReducer;
