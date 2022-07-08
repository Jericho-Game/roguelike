import { render } from '@testing-library/react';
import AvatarChanger from '../AvatarChanger';

const defaultProps = {
  avatar: 'qwe.jpg',
  first_name: 'John',
  second_name: 'Doe',
};

describe('AvatarChanger Test', () => {
  it('matches snapshot', () => {
    const { baseElement } = render(<AvatarChanger {...defaultProps} />);

    expect(baseElement).toMatchSnapshot();
  });
});
