import { RouterState } from 'redux-first-history';
import { initialState as user, UserState } from './user';
import { ForumState, initialState as forum } from './forum';
import isServer from '../utils/isServer';

export type State = {
  user: UserState;
  forum: ForumState;
  router: RouterState;
};

export default function getInitialState(pathname = '/'): State {
  // eslint-disable-next-line no-underscore-dangle
  return (!isServer && window?.__INITIAL_STATE__)
    // eslint-disable-next-line no-underscore-dangle
    ? window.__INITIAL_STATE__
    : {
      user,
      forum,
      router: {
        location: {
          pathname,
          search: '',
          hash: '',
          key: '',
          state: '',
        },
        action: 'POP' as RouterState['action'],
      },
    };
}
