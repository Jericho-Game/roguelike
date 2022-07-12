import {
  FC,
  useEffect,
  useState,
  ComponentType,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import oAuthService from '../services/oauth';
import Spinner from '../components/Spinner';

// TODO need to make new route for oAuth  /callback
const withOAuthCheck = <P extends Record<string, unknown>>(Component: ComponentType<P>): FC => (
  function WithOAuthCheck(props: P) {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    if (!code) {
      return <Component {...props} />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isFetching, setIsFetching] = useState(true);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const sendCode = async () => {
        try {
          await oAuthService.sendCode(code);
        } catch (error) {
          console.error(error);
        }
        setIsFetching(false);
      };
      sendCode();
    }, [code]);

    return (code && isFetching)
      ? <Spinner fullscreen />
      : <Component {...props} />;
  }
);

export default withOAuthCheck;
