import {
  Route,
  Routes,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import IndexPage from '../../pages/index';
import ForumPage from '../../pages/forum';
import LeaderboardPage from '../../pages/leaderboard';
import SignInPage from '../../pages/signin';
import SignUpPage from '../../pages/signup';
import ProfilePage from '../../pages/profile';
import Page404 from '../../pages/404';

import { storeUser } from '../../store/user';
import ErrorBoundaryWrapper from '../ErrorBoundaryWrapper';
import Layout from '../Layout';

export default function App() {
  const dispatch = useDispatch();

  if (window.localStorage.getItem('userAuthorized')) {
    dispatch(storeUser());
  }

  return (
    <Layout>
      <ErrorBoundaryWrapper>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/:id" element={<ForumPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ErrorBoundaryWrapper>
    </Layout>
  );
}
