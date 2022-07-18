import { createSelector } from 'reselect';
import { UserState } from './userStore';

export type State = {
  user: UserState,
};

export const selectUser = (state: State) => state.user.data;
export const selectUserError = (state: State) => state.user.error;
export const selectIsUserAuthorized = createSelector(
  selectUser,
  (user) => Boolean(user),
);
export const selectIsUserPending = createSelector(
  selectUser,
  selectUserError,
  (user, error) => Boolean(user) || Boolean(error),
);
