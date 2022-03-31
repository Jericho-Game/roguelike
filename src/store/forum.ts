/* eslint-disable no-param-reassign, @typescript-eslint/default-param-last */
import { createRoutine } from 'redux-saga-routines';

export type ForumState = {
  data: Nullable<Thread[]>;
  current: Nullable<Thread>;
  error: Nullable<Error>;
};

const initialState: ForumState = {
  data: null,
  current: null,
  error: null,
};

export const getThreads = createRoutine('forum/GET_THREADS');
export const getThread = createRoutine('user/GET_THREAD');

const forumReducer = (state = initialState, { type, payload }: Action<ForumState>) => {
  switch (type) {
    case getThreads.SUCCESS:
      state.data = payload.data;
      return state;
    case getThreads.FAILURE:
      state.error = payload.error;
      return state;
    case getThread.SUCCESS:
      state.current = payload.current;
      return state;
    case getThread.FAILURE:
      state.error = payload.error;
      return state;
    default:
      return state;
  }
};

export default forumReducer;
