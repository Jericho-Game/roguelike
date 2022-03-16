import classnames from 'classnames';

type OwnProps = Pick<User, 'first_name' | 'second_name' | 'avatar'> & {
  className?: string,
};

export default function Avatar({
  className = '',
  ...user
}: OwnProps) {
  const initials = user.first_name[0] + user.second_name[1];
  return (
    <div
      className={classnames(
        className,
        'flex items-center justify-center overflow-hidden bg-gray-100 rounded-full relative w-1/2 aspect-square',
      )}
    >
      {user.avatar
        ? <img src={user.avatar} alt="avatar" className="m-0" />
        : (<span className="uppercase">{initials}</span>)}
    </div>
  );
}
