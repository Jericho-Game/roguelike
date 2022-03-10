import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import classnames from 'classnames';
import Input from '../components/Input';
import Button from '../components/Button';
import Notification from '../components/Notification';
import patterns from '../utils/formValidation';
import { signIn } from '../store/user';

type FormData = {
  login: string;
  password: string;
};

export default function SignInPage() {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    // TODO change page
    try {
      dispatch(signIn(data));
      navigate('/profile');
    } catch (error) {
      setNotification(error.message);
    }
  });

  const notifyNode = notification ? <Notification type="error" className="mt-4 absolute w-[calc(100%-4rem)] bottom-4 ml-8"><span>{notification}</span></Notification> : null;

  return (
    <div
      className={classnames(
        'grid grid-rows-[1fr] justify-center items-center w-full h-full bg-gray-100',
      )}
    >
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
              'mt-4 mb-16',
            )}
          >
            <span>Отправить</span>
          </Button>
        </form>
        { notifyNode }
      </div>
    </div>
  );
}
