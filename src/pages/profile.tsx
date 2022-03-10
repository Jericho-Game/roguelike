import { useSelector } from 'react-redux';
import type { UserState } from '../store/user';

export default function ProfilePage() {
  const { data: user } = useSelector(
    (state: { user: UserState }) => state.user,
  );
  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 sm:px-6">
      <h1>Profile Page</h1>
      {JSON.stringify(user, null, 2)}
    </div>
  );
}
