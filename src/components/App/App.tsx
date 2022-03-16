import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as Cookies from 'js-cookie';

import Header from '../Header';
import IndexPage from '../../pages/index';
import Page404 from '../../pages/404';
import ForumPage from '../../pages/forum';
import LeaderboardPage from '../../pages/leaderboard';
import SignInPage from '../../pages/signin';
import SignUpPage from '../../pages/signup';
import ProfilePage from '../../pages/profile';

import { storeUser } from '../../store/user';

export default function App() {
  const dispatch = useDispatch();

  console.log(document.cookie);
  if (Cookies.get('userAuthorized')) {
    dispatch(storeUser());
  }
  return (
    <Router>
      <Header />
      <main className="mx-auto h-full w-full grow-q">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
    </Router>
  );
}
