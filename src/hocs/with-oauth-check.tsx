import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classnames from 'classnames';
import oAuthService from '../services/oauth';
import Spinner from '../components/Spinner';

// TODO need to make new route for oAuth  /callback
const withOAuthCheck = <P extends object>(Component: React.ComponentType<P>): FC => (
  function WithOAuthCheck(props: P) {
    const [isFetching, setIsFetching] = useState(true);
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
      const sendCode = async () => {
        if (code) {
          try {
            await oAuthService.sendCode(code);
          } catch (error) {
            console.error(error);
          }
        }
        setIsFetching(false);
      };
      sendCode();
    }, [code]);

    const spinner = (
      <div
        className={classnames(
          'fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center',
        )}
      >
        <Spinner />
      </div>
    );

    if (!code) {
      return <Component {...props} />;
    }

    return (code && isFetching)
      ? spinner
      : <Component {...props} />;
  }
);

export default withOAuthCheck;
