import {
  Route,
  Routes,
} from 'react-router-dom';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';

import { storeUser } from './store/user';
import ErrorBoundaryWrapper from './components/ErrorBoundaryWrapper';
import Layout from './components/Layout';
import routes from './routes';
import withOAuthCheck from './hocs/with-oauth-check';
import withAuthCheck from './hocs/with-auth-check';

function App() {
  const dispatch = useDispatch();
  if (globalThis?.localStorage?.getItem('userAuthorized')) {
    dispatch(storeUser());
  }
  return (
    <Layout>
      <ErrorBoundaryWrapper>
        <Routes>
          {routes.map(({ fetchData, ...routeProps }) => (
            <Route key={routeProps.path} {...routeProps} />
          ))}
        </Routes>
      </ErrorBoundaryWrapper>
    </Layout>
  );
}

export default compose(
  withOAuthCheck,
  withAuthCheck,
)(App);
