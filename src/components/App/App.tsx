import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Header from '../Header';
import IndexPage from '../../pages/index';
import Page404 from '../../pages/404';
import ForumPage from '../../pages/forum';
import LeaderboardPage from '../../pages/leaderboard';
import SignInPage from '../../pages/signin';
import SignUpPage from '../../pages/signup';
import ProfilePage from '../../pages/profile';

export default function App() {
  return (
    <Router>
      <Header />
      <main className="max-w-7xl mx-auto mt-10 px-4 sm:px-6">
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
