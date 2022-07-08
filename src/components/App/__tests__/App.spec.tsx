import { render } from '@testing-library/react';
import App from '../App';

type MockComponentProps = { children?: JSX.Element, element?: JSX.Element };

const dispatch = jest.fn();

jest.mock('../../../pages/index', () => ({
  __esModule: true,
  default: () => 'IndexPage',
}));
jest.mock('../../../pages/forum', () => ({
  __esModule: true,
  default: () => 'ForumPage',
}));
jest.mock('../../../pages/leaderboard', () => ({
  __esModule: true,
  default: () => 'LeaderboardPage',
}));
jest.mock('../../../pages/signin', () => ({
  __esModule: true,
  default: () => 'SignInPage',
}));
jest.mock('../../../pages/signup', () => ({
  __esModule: true,
  default: () => 'SignUpPage',
}));
jest.mock('../../../pages/profile', () => ({
  __esModule: true,
  default: () => 'ProfilePage',
}));
jest.mock('../../../pages/404', () => ({
  __esModule: true,
  default: () => 'Page404',
}));

jest.mock('../../ErrorBoundaryWrapper', () => ({
  __esModule: true,
  default: ({ children }: MockComponentProps) => <div data-testid="ErrorBoundaryWrapper">{children}</div>,
}));
jest.mock('../../Layout', () => ({
  __esModule: true,
  default: ({ children }: MockComponentProps) => <div data-testid="Layout">{children}</div>,
}));

jest.mock('react-redux', () => ({
  __esModule: true,
  useDispatch: () => dispatch,
}));

jest.mock('react-router-dom', () => ({
  __esModule: true,
  BrowserRouter: ({ children, ...props }: MockComponentProps) => <div data-testid="BrowserRouter" {...props}>{children}</div>,
  Routes: ({ children, ...props }: MockComponentProps) => <div data-testid="Routes" {...props}>{children}</div>,
  Route: ({ element, ...props }: MockComponentProps) => <div data-testid="Route" {...props}>{element}</div>,
}));

describe('App Test', () => {
  it('matches snapshot', () => {
    const { container } = render(<App />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('has IndexPage', () => {
    const { container } = render(<App />);
    const indexPageRoute = container.querySelector("[path='/']");

    expect(indexPageRoute).toBeInTheDocument();
    expect(indexPageRoute?.textContent).toBe('IndexPage');
  });

  it('has ForumPage', () => {
    const { container } = render(<App />);
    const forumPageRoute = container.querySelector("[path='/forum']");
    const forumIdPageRoute = container.querySelector("[path='/forum/:id']");

    expect(forumPageRoute).toBeInTheDocument();
    expect(forumIdPageRoute).toBeInTheDocument();
    expect(forumPageRoute?.textContent).toBe('ForumPage');
    expect(forumIdPageRoute?.textContent).toBe('ForumPage');
  });

  it('has LeaderboardPage', () => {
    const { container } = render(<App />);
    const leaderboardPageRoute = container.querySelector("[path='/leaderboard']");

    expect(leaderboardPageRoute).toBeInTheDocument();
    expect(leaderboardPageRoute?.textContent).toBe('LeaderboardPage');
  });

  it('has SignInPage', () => {
    const { container } = render(<App />);
    const signInPageRoute = container.querySelector("[path='/signin']");

    expect(signInPageRoute).toBeInTheDocument();
    expect(signInPageRoute?.textContent).toBe('SignInPage');
  });

  it('has SignUpPage', () => {
    const { container } = render(<App />);
    const signUpPageRoute = container.querySelector("[path='/signup']");

    expect(signUpPageRoute).toBeInTheDocument();
    expect(signUpPageRoute?.textContent).toBe('SignUpPage');
  });

  it('has ProfilePage', () => {
    const { container } = render(<App />);
    const profilePageRoute = container.querySelector("[path='/profile']");

    expect(profilePageRoute).toBeInTheDocument();
    expect(profilePageRoute?.textContent).toBe('ProfilePage');
  });

  it('has Page404', () => {
    const { container } = render(<App />);
    const notFoundPageRoute = container.querySelector("[path='*']");

    expect(notFoundPageRoute).toBeInTheDocument();
    expect(notFoundPageRoute?.textContent).toBe('Page404');
  });
});
