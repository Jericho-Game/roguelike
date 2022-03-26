import { useErrorHandler } from 'react-error-boundary';
import LeaderboardTable from '../components/LeaderboardTable';

import useDataFetch from '../hooks/useDataFetch';

export default function LeaderboardPage() {
  const handleError = useErrorHandler();
  const { data, error } = useDataFetch<User>('/leaderboard');
  if (error) handleError(new Error(`${error}`));
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2 w-full">
        <h1>Leaderboard</h1>
      </div>
      <div className="bg-gray-100">
        <LeaderboardTable users={data ?? []} />
      </div>
    </>
  );
}
