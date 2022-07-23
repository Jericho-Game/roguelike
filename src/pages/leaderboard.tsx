import { useErrorHandler } from 'react-error-boundary';
import LeaderboardTable from '../components/LeaderboardTable';

import useDataMock from '../_demodata/useDataMock';
import PageMeta from '../components/PageMeta';

export default function LeaderboardPage() {
  const handleError = useErrorHandler();
  const { data = [], error } = useDataMock<User[]>('users');
  if (error) {
    handleError(new Error(`${error}`));
  }
  return (
    <>
      <PageMeta
        title="Leaderboard"
        description="Game leaderboard with user stats"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2 w-full">
        <h1>Leaderboard</h1>
      </div>
      <div className="bg-gray-100">
        <LeaderboardTable users={data} />
      </div>
    </>
  );
}
