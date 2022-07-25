import { createRoutine } from 'redux-saga-routines';

export type ForumState = {
  data: Nullable<Thread[]>;
  current: Nullable<Thread>;
  error: Nullable<Error>;
};

export const initialState: ForumState = {
  data: null,
  current: null,
  error: null,
};

export const getThreads = createRoutine('forum/GET_THREADS');
export const getThread = createRoutine('user/GET_THREAD');

const forumReducer: Reducer<ForumState> = (
  state = initialState,
  { type, payload } = { type: '', payload: initialState },
) => {
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
