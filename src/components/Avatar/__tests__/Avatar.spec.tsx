import { render } from '@testing-library/react';
import Avatar from '../Avatar';

const defaultProps = {
  firstName: 'John',
  secondName: 'Doe',
};

const create = (props = {}) => <Avatar {...defaultProps} {...props} />;

describe('Avatar Test', () => {
  it('matches snapshot', () => {
    const { baseElement } = render(create());

    expect(baseElement).toMatchSnapshot();
  });

  it('with src', () => {
    const { baseElement } = render(create({
      src: './qwe.jpg',
    }));

    expect(baseElement).toMatchSnapshot();
  });

  it('with className', () => {
    const { baseElement } = render(create({
      className: 'self-center text-7xl',
    }));

    expect(baseElement).toMatchSnapshot();
  });
});
