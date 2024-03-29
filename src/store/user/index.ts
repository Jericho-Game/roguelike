import { selectIsUserAuthorized, selectIsUserPending } from './selectors';
import userReducer, {
  signUp,
  signIn,
  storeUser,
  signOut,
  changeProfile,
  initialState,
  UserState,
} from './userStore';

export default userReducer;
export {
  selectIsUserAuthorized,
  selectIsUserPending,
  signUp,
  signIn,
  storeUser,
  signOut,
  changeProfile,
  initialState,
  UserState,
};
