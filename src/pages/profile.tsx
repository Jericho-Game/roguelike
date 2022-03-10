import { useSelector } from 'react-redux';
import type { UserState } from '../store/user';

export default function ProfilePage() {
  const { data: user } = useSelector(
    (state: { user: UserState }) => state.user,
  );
  return (
    <>
      <h1>Profile Page</h1>
      {JSON.stringify(user, null, 2)}
    </>
  );
}
