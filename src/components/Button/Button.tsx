import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';

type ButtonProps<T extends ElementType> = PropsWithChildren<{
  as?: T;
  className?: string;
  variant: 'primary' | 'secondary' | 'alternate' | 'icon';
}>;

function getButtonClassName(variant: 'primary' | 'secondary' | 'alternate' | 'icon') {
  switch (variant) {
    case 'alternate':
      return 'hover:text-gray-800 hover:border-gray-800';
    case 'icon':
      return 'hover:text-gray-500 hover:bg-gray-100 '
        + 'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-hover';
    default:
      return `hover:bg-${variant}-hover`;
  }
}

export default function Button<T extends ElementType = 'button'>({
  as,
  variant,
  className,
  ...props
}: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const Component = as ?? 'button';
  const btnStatesClassNames = getButtonClassName(variant);
  return <Component className={`btn btn-${variant} ${btnStatesClassNames} ${className ?? ''}`} {...props} />;
}
