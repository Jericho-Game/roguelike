import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import oAuthService from '../services/oauth';
import { FullScreenSpinner } from '../components/Spinner';

// TODO need to make new route for oAuth  /callback
const withOAuthCheck = <P extends object>(Component: React.ComponentType<P>): FC => (
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
      ? <FullScreenSpinner />
      : <Component {...props} />;
  }
);

export default withOAuthCheck;
