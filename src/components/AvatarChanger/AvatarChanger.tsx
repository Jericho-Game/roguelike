import {
  useCallback, useRef, useState, ChangeEvent, FormEvent, MouseEvent,
} from 'react';
import classnames from 'classnames';
import userServise from '../../services/user';
import Avatar from '../Avatar';
import Button from '../Button';
import Notification from '../Notification';

type OwnProps = {
  avatarSrc: string | undefined;
  initials: string;
};

export default function AvatarChanger({
  avatarSrc,
  initials,
}: OwnProps) {
  const [notification, setNotification] = useState('');
  const elementInputFile = useRef<HTMLInputElement>(null);
  const [newSrc, setNewSrc] = useState('');
  const [avatarIsEdit, setAvatarIsEdit] = useState(false);

  const validateImgFile = (file: File | undefined) => !!file?.type.match('image.*');

  const onInputChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.target;
    if (!files?.[0]) {
      return;
    }
    if (!validateImgFile(files?.[0])) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setNewSrc(e.target?.result as string);
    };
    reader.readAsDataURL(files?.[0]);
  }, []);

  const onSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    const file = elementInputFile.current?.files?.[0];
    if (!file) {
      return;
    }
    if (!validateImgFile(file)) {
      return;
    }
    const form = new FormData();
    form.append('avatar', file);
    userServise.changeAvatar(form)
      .then((response: User) => {
        // eslint-disable-next-line
        console.log('response', response)
        setAvatarIsEdit(false);
      })
      .catch((error: Error) => {
        if (!setNotification) {
          return;
        }
        setNotification(error.message);
      });
  }, []);

  const clearInputAvatar = () => {
    if (elementInputFile && elementInputFile?.current) {
      elementInputFile.current.value = '';
      setNewSrc('');
    }
  };

  const onCancel = (event: MouseEvent) => {
    event?.preventDefault();
    clearInputAvatar();
    setAvatarIsEdit(false);
  };

  const onEditData = (event: MouseEvent) => {
    event?.preventDefault();
    setAvatarIsEdit(true);
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
  const buttonAvatarEdit = avatarIsEdit
    ? (
      <form
        className="m-0"
        onSubmit={onSubmit}
      >
        <label
          className={classnames([
            'btn btn-primary w-full',
            { 'visually-hidden': newSrc },
          ])}
          htmlFor="avatar"
        >
          Выберите файл
          <input
            ref={elementInputFile}
            type="file"
            onChange={onInputChange}
            id="avatar"
            className={classnames(
              'visually-hidden',
            )}
          />
        </label>
        <div
          className={classnames([
            { 'visually-hidden': !newSrc },
          ])}
        >
          <div
            className={classnames(
              'grid grid-cols-2 gap-x-4',
            )}
          >
            <Button
              type="submit"
              variant="secondary"
              className={classnames(
                'mt-4 mb-0',
              )}
            >
              <span>Send</span>
            </Button>
            <Button
              type="button"
              variant="primary"
              className={classnames(
                'mt-4 mb-0',
              )}
              onClick={onCancel}
            >
              <span>Сancel</span>
            </Button>
          </div>
        </div>
      </form>
    )
    : (
      <Button
        type="button"
        variant="secondary"
        className={classnames(
          'mt-4 mb-0',
        )}
        onClick={onEditData}
      >
        <span>Edit</span>
      </Button>
    );

  return (
    <div
      className={classnames(
        'bg-white rounded-xl p-4 pb-16 flex flex-col justify-between h-full relative',
      )}
    >
      <Avatar
        avatarSrc={newSrc || avatarSrc}
        initials={initials}
        className="self-center"
      />
      { buttonAvatarEdit }
      { notifyNode }
    </div>
  );
}
