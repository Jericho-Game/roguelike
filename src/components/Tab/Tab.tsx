import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';

import classnames from 'classnames';

type TabProps<T extends ElementType> = PropsWithChildren<{
  as?: T;
  active?: boolean;
  className?: string;
}>;

export default function Tab<T extends ElementType = 'button'>({
  as,
  active,
  className,
  ...props
}: TabProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TabProps<T>>): JSX.Element {
  const Component = as ?? 'button';
  return (
    <Component
      className={classnames(
        'text-base font-medium border-b-2 py-2',
        'hover:border-primary-hover hover:text-gray-900', // hover state
        className, // additional classnames
        {
          'text-gray-900 border-primary-normal': active,
          'text-gray-500 border-transparent': !active,
        },
      )}
      {...props}
    />
  );
}