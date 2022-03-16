import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import classnames from 'classnames';
import Input from '../components/Input';
import Button from '../components/Button';
import AvatarChanger from '../components/AvatarChanger';
import Notification from '../components/Notification';
import userServise from '../services/user';
import patterns from '../utils/formValidation';

type FormData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

const user = {
  login: 'string',
  email: 'string',
  first_name: 'string',
  second_name: 'string',
  display_name: 'string',
  phone: '00000',
  avatar: undefined,
};

export default function ProfilePage() {
  const {
    control, handleSubmit, formState: { errors }, reset,
  } = useForm<FormData>();
  const [notification, setNotification] = useState('');
  const [dataIsEdit, setDataIsEdit] = useState(false);
  const [data, setData] = useState(user as User);
  const navigate = useNavigate();
  const onSubmit = handleSubmit((formData) => {
    // eslint-disable-next-line
    console.log('formData', formData)
    userServise.changeProfile(formData)
      // TODO change page
      .then(() => {
        setData(user as User);
        setDataIsEdit(false);
      })
      .then(() => navigate('/profile'))
      .catch((error: Error) => {
        setNotification(error.message);
      });
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

  const initials = data.first_name[0] + data.second_name[1];

  return (
    <div
      className={classnames(
        'flex flex-col h-full',
      )}
    >
      <h1
        className={classnames(
          'max-w-7xl mx-auto px-4 sm:px-6 w-full pb-16',
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
                  defaultValue={data?.[input.name]}
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
            <AvatarChanger
              avatarSrc={user.avatar}
              initials={initials}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
