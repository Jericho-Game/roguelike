import { ElementType } from 'react';
import { render } from '@testing-library/react';
import Button, { ButtonProps } from '../Button';

const defaultProps = {
  variant: 'primary' as const,
};

const create = (props = {}) => <Button {...defaultProps} {...props} />;

describe('Button Test', () => {
  it('matches snapshot', () => {
    const { container } = render(create());

    expect(container.firstChild).toMatchSnapshot();
  });

  it('as another button', () => {
    const as = ({ children, ...props }: ButtonProps<ElementType>) => (
      <div {...props}>{children}</div>
    );
    const { container } = render(create({ as }));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('with className', () => {
    const className = 'test';
    const { container } = render(create({ className }));

    expect(container.firstChild).toHaveClass(className);
  });

  it('as icon variant', () => {
    const Icon: React.FC = (props) => <div {...props}>Icon</div>;
    const { container } = render(create({
      variant: 'icon',
      children: <Icon />,
    }));
    const button = container.firstChild;
    const icon = button?.firstChild;

    expect(button).toHaveClass('btn-icon');
    expect(icon).toHaveTextContent('Icon');
  });
});
