import { FC, useEffect, ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import { storeUser } from '../store/user';
import { selectIsUserPending } from '../store/user/selectors';

const withAuthCheck = <P extends Record<string, unknown>>(Component: ComponentType<P>): FC => (
  function WithAuthCheck(props: P) {
    const dispatch = useDispatch();
    const isPending = useSelector(selectIsUserPending);

    useEffect(() => {
      dispatch(storeUser());
    }, [dispatch, isPending]);
    return !isPending
      ? <Spinner fullscreen />
      : <Component {...props} />;
  }
);

export default withAuthCheck;
