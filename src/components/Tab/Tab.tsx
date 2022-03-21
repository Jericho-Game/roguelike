import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';

import classnames from 'classnames';

type TabProps<T extends ElementType> = PropsWithChildren<{
  as?: T;
  active?: boolean;
  variant: 'primary' | 'secondary';
  className?: string;
}> & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'variant' | 'children'>;

export default function Tabu<T extends ElementType = 'button'>({
  as,
  active,
  variant,
  className = '',
  ...props
}: TabProps<T>): JSX.Element {
  const Component = as ?? 'button';
  return (
    <Component
      role="tab"
      className={classnames(
        'text-base font-medium border-b-2 py-2',
        className, // additional classnames
        {
          'hover:border-primary-hover hover:text-gray-900': variant === 'primary', // hover state
          'hover:border-secondary-hover hover:text-gray-900': variant === 'secondary', // hover state
          'text-gray-900 border-primary-normal': active && variant === 'primary',
          'text-gray-900 border-secondary-normal': active && variant === 'secondary',
          'text-gray-500 border-transparent': !active,
        },
      )}
      {...props}
    />
  );
}
