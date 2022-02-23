import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';
import classnames from 'classnames';

type ButtonProps<T extends ElementType> = PropsWithChildren<{
  as?: T;
  className?: string;
  variant: 'primary' | 'secondary' | 'alternate' | 'icon';
}> & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'variant' | 'children'>;

export default function Button<T extends ElementType = 'button'>({
  as,
  variant,
  className = '',
  ...props
}: ButtonProps<T>) {
  const Component = as ?? 'button';
  return (
    <Component
      className={classnames(
        `btn btn-${variant}`,
        className,
        {
          [`hover:bg-${variant}-hover`]: variant !== 'alternate' && variant !== 'icon',
          'hover:text-gray-800 hover:border-gray-800': variant === 'alternate',
          'hover:text-gray-500 hover:bg-gray-100': variant === 'icon',
          'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-hover': variant === 'icon',
        },
      )}
      {...props}
    />
  );
}
