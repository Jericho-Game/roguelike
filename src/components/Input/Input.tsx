import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import classnames from 'classnames';

type OwnProps = {
  errorText?: string;
  type?: 'number' | 'text' | 'password' | 'file',
  className?: string,
  label?: string | undefined,
  id?: string | undefined,
};

type InputProps = OwnProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    errorText = '',
    type = 'text',
    className = '',
    onChange,
    label,
    id,
    value,
  },
  ref,
) => (
  <div className={classnames('grid pb-6 relative')}>
    {label && id && <label htmlFor={id} className={classnames('text-gray-400 mb-1')}>{label}</label>}
    <input
      ref={ref}
      onChange={onChange}
      type={type}
      value={value}
      className={classnames(
        className,
        'rounded border border-[#E1E1E1] w-auto pb-2 pt-2 pl-[24px] pr-[40px]',
        { 'border-error': errorText },
      )}
    />
    {
      errorText
      && <span className={classnames('absolute inset-x-0 bottom-0 text-error m-0 text-center')}>{ errorText }</span>
    }
  </div>
));

export default Input;
