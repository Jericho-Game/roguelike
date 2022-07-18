import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import classnames from 'classnames';
import Input from '../components/Input';
import Button from '../components/Button';
import Notification from '../components/Notification';
import patterns from '../utils/formValidation';
import oAuthService from '../services/oauth';

import { signIn } from '../store/user';
import type { UserState } from '../store/user';
import PageMeta from '../components/PageMeta';

type FormData = {
  login: string;
  password: string;
};

export default function SignInPage() {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
  const { data: user, error } = useSelector((state: { user: UserState }) => state.user);

  useEffect(() => {
    if (user && !error) {
      navigate('/');
    } else if (error) {
      setNotification(error.message);
    }
  }, [user, error, navigate]);

  const onSubmit = handleSubmit((data) => {
    try {
      dispatch(signIn(data));
    } catch (err) {
      setNotification(err.message);
    }
  });

  const handleYandexClick = async () => {
    try {
      const data = await oAuthService.getServiceId();
      document.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${window.location.origin}`;
    } catch (err) {
      setNotification(err.message);
    }
  };

  const notifyNode = notification
    ? (
      <Notification type="error" className="mt-4 absolute w-[calc(100%-4rem)] bottom-4 ml-8">
        <span>{notification}</span>
      </Notification>
    )
    : null;

  return (
    <div
      className={classnames(
        'grid grid-rows-[1fr] justify-center items-center w-full h-full bg-gray-100',
      )}
    >
      <PageMeta
        title="Sign in"
        description="Sign in to the game"
      />
      <div
        className={classnames(
          'grid grid-rows-[1fr] justify-center items-center bg-white py-6 px-8 relative',
        )}
      >
        <h1 className="font-bold leading-tight  text-4xl text-center mb-6">Sign In Page</h1>
        <form
          onSubmit={onSubmit}
          className={classnames(
            'rounded-xl  bg-white w-[445px] grid',
          )}
        >
          <Controller
            name="login"
            rules={{
              pattern: {
                value: patterns.LOGIN,
                message: 'Login is invalid',
              },
              required: 'This is required',
            }}
            control={control}
            render={({ field }) => <Input {...field} id="login" label="Login" errorText={errors.login?.message} />}
          />
          <Controller
            name="password"
            rules={{
              pattern: {
                value: patterns.PASSWORD,
                message: 'Password is invalid',
              },
              required: 'This is required',
            }}
            control={control}
            render={({ field }) => (
              <Input {...field} type="password" id="password" label="Password" errorText={errors.password?.message} />
            )}
          />
          <Button
            variant="secondary"
            className={classnames(
              'mt-4',
            )}
          >
            <span>Отправить</span>
          </Button>
        </form>

        <div
          className={classnames(
            'mt-4 mb-16',
          )}
        >
          <ul>
            <li>
              <button
                type="button"
                aria-label="Sign in with Yandex"
                className={classnames(
                  'h-12 w-12 shadow-none bg-contain border-none bg-no-repeat bg-center bg-[url("assets/images/icons/icon-yandex.svg")]',
                )}
                onClick={handleYandexClick}
              />
            </li>
          </ul>
        </div>
        { notifyNode }
      </div>
    </div>
  );
}
