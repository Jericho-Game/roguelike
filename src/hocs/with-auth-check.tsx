import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FullScreenSpinner } from '../components/Spinner';
import { storeUser } from '../store/user/userStore';
import { selectIsUserPending } from '../store/user/selectors';

const withAuthCheck = <P extends object>(Component: React.ComponentType<P>): FC => (
  function WithAuthCheck(props: P) {
    const dispatch = useDispatch();
    const isPending = useSelector(selectIsUserPending);

    useEffect(() => {
      dispatch(storeUser());
    }, [dispatch, isPending]);
    return !isPending
      ? <FullScreenSpinner />
      : <Component {...props} />;
  }
);

export default withAuthCheck;
