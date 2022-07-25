import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import classnames from 'classnames';
import Input from '../components/Input';
import Button from '../components/Button';
import Notification from '../components/Notification';
import patterns from '../utils/formValidation';
import { signUp, UserState } from '../store/user';
import PageMeta from '../components/PageMeta';

type FormData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export default function SignInPage() {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
  const { data: user } = useSelector((state: { user: UserState }) => state.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = handleSubmit((data) => {
    try {
      dispatch(signUp(data));
    } catch (error) {
      setNotification(error.message);
    }
  });

  const inputs = [
    {
      name: 'first_name' as const,
      label: 'First name',
      pattern: patterns.DEFAULT,
      errorMessage: 'First name is invalid',
      required: 'This is required',
    },
    {
      name: 'second_name' as const,
      label: 'Second name',
      pattern: patterns.DEFAULT,
      errorMessage: 'Second name is invalid',
      required: 'This is required',
    },
    {
      name: 'login' as const,
      label: 'Login',
      pattern: patterns.LOGIN,
      errorMessage: 'Login is invalid',
      required: 'This is required',
    },
    {
      name: 'email' as const,
      label: 'Email',
      pattern: patterns.EMAIL,
      errorMessage: 'Email is invalid',
      required: 'This is required',
    },
    {
      name: 'password' as const,
      label: 'Password',
      pattern: patterns.PASSWORD,
      errorMessage: 'Password is invalid',
      required: 'This is required',
    },
    {
      name: 'phone' as const,
      label: 'Phone',
      pattern: patterns.PHONE,
      errorMessage: 'Phone is invalid',
      required: 'This is required',
    },
  ];

  const notifyNode = notification ? <Notification type="error" className="mt-4 absolute w-[calc(100%-4rem)] bottom-4 ml-8"><span>{notification}</span></Notification> : null;

  return (
    <div
      className={classnames(
        'grid grid-rows-[1fr] justify-center items-center w-full h-full bg-gray-100',
      )}
    >
      <PageMeta
        title="Sign up"
        description="Sign up to the game"
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
          { inputs.map((input) => (
            <Controller
              name={input.name}
              key={input.name}
              rules={{
                pattern: {
                  value: input.pattern,
                  message: input.errorMessage,
                },
                required: input.required,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id={input.name}
                  label={input.label}
                  errorText={errors?.[input.name]?.message}
                />
              )}
            />
          ))}
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
