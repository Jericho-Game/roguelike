import { FC, ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsUserAuthorized } from '../store/user';

const withAuth = <P extends Record<string, unknown>>(Component: ComponentType<P>): FC => (
  function WithAuth(props: P) {
    const isUserAuthorized = useSelector(selectIsUserAuthorized);
    return isUserAuthorized
      ? <Component {...props} />
      : <Navigate to="/sign-in" />;
  });

export default withAuth;
