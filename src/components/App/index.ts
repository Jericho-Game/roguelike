import { compose } from 'redux';
import App from './App';
import withAuthCheck from '../../hocs/with-auth-check';
import withOAuthCheck from '../../hocs/with-oauth-check';

export default compose(
  withOAuthCheck,
  withAuthCheck,
)(App);
