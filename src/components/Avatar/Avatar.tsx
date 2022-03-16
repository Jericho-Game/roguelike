import classnames from 'classnames';

type OwnProps = {
  className?: string,
  avatarSrc?: string | null;
  initials?: string;
};

export default function Avatar({
  className = '',
  avatarSrc,
  initials,
}: OwnProps) {
  return (
    <div
      className={classnames(
        className,
        'flex items-center justify-center overflow-hidden bg-gray-100 rounded-full relative w-1/2 aspect-square',
      )}
    >
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt="avatar"
          className="m-0"
        />
      ) : (
        <span
          className={classnames(
            className,
            'text-7xl',
          )}
        >
          { initials }
        </span>
      )}
    </div>
  );
}
