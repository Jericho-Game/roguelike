import { useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import classnames from 'classnames';
import Input from '../components/Input';
import Button from '../components/Button';
import AvatarChanger from '../components/AvatarChanger';
import Notification from '../components/Notification';
import patterns from '../utils/formValidation';
import { changeProfile } from '../store/user';
import type { UserState } from '../store/user';

type FormData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

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
    name: 'display_name' as const,
    label: 'Display name',
    pattern: patterns.DEFAULT,
    errorMessage: 'Display name is invalid',
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
    name: 'phone' as const,
    label: 'Phone',
    pattern: patterns.PHONE,
    errorMessage: 'Phone is invalid',
    required: 'This is required',
  },
];

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state: { user: UserState }) => state.user);
  const [notification, setNotification] = useState('');
  const [dataIsEdit, setDataIsEdit] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((formData) => {
    try {
      dispatch(changeProfile(formData));
      setDataIsEdit(false);
    } catch (error) {
      setNotification(error.message);
    }
  });

  const editData = (event: MouseEvent) => {
    event?.preventDefault();
    setDataIsEdit(true);
  };

  const cancelData = (event: MouseEvent) => {
    event?.preventDefault();
    setDataIsEdit(false);
    reset();
  };

  const notifyNode = notification
    ? (
      <Notification
        type="error"
        className="mt-4 absolute w-[calc(100%-4rem)] bottom-4 ml-8"
      >
        <span>
          {notification}
        </span>
      </Notification>
    )
    : null;
  const buttonDataEdit = dataIsEdit
    ? (
      <div
        className={classnames(
          'grid grid-cols-2 gap-x-4',
        )}
      >
        <Button
          variant="secondary"
          className={classnames(
            'mt-4 mb-16',
          )}
        >
          <span>Send</span>
        </Button>
        <Button
          type="button"
          variant="primary"
          className={classnames(
            'mt-4 mb-16',
          )}
          onClick={cancelData}
        >
          <span>Сancel</span>
        </Button>
      </div>
    )
    : (
      <Button
        type="button"
        variant="secondary"
        className={classnames(
          'mt-4 mb-16',
        )}
        onClick={editData}
      >
        <span>Edit</span>
      </Button>
    );

  return user && (
    <div
      className={classnames(
        'flex flex-col h-full',
      )}
    >
      <h1
        className={classnames(
          'max-w-7xl mx-auto px-4 sm:px-6 w-full pb-2',
        )}
      >
        Profile
      </h1>
      <div
        className={classnames(
          'bg-gray-100 grow h-full flex items-center',
        )}
      >
        <div
          className={classnames(
            'grid grid-cols-2 gap-x-16 items-center max-w-7xl mx-auto px-4 sm:px-6 w-full ',
          )}
        >
          <section className="relative">
            <form
              onSubmit={onSubmit}
              className={classnames(
                'w-[445px] grid',
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
                  defaultValue={user?.[input.name]}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id={input.name}
                      label={input.label}
                      className={classnames(
                        'pl-[0px]',
                        { 'bg-gray-100 !border-gray-100 pointer-events-none': !dataIsEdit },
                      )}
                      errorText={errors?.[input.name]?.message}
                    />
                  )}
                />
              ))}
              { buttonDataEdit }
            </form>
            { notifyNode }
          </section>
          <section
            className={classnames(
              'h-full',
            )}
          >
            <AvatarChanger {...user} />
          </section>
        </div>
      </div>
    </div>
  );
}
