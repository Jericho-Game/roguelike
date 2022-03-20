import { ReactNode } from 'react';
import classnames from 'classnames';

type OwnProps = {
  type: 'error' | 'success' | 'notification',
  children: ReactNode | string,
  className?: string,
};

export default function Notification({ type = 'notification', children, className = '' }: OwnProps) {
  const classesOfType = {
    error: 'text-error bg-red-200 bg-[url("assets/images/icon-error.svg")]',
    success: 'text-success bg-green-200 bg-[url("assets/images/icon-success.svg")]',
    notification: 'text-notification bg-orange-200 bg-[url("assets/images/icon-notification.svg")]',
  };

  return (
    <div className={classnames(
      classesOfType[type],
      className,
      'p-4 pl-16 bg-no-repeat bg-[left_1rem_center] rounded',
    )}
    >
      { children }
    </div>
  );
}
