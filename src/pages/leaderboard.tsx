import LeaderboardTable from '../components/LeaderboardTable';

import useDataFetch from '../hooks/useDataFetch';

export default function LeaderboardPage() {
  const { data, loading, error } = useDataFetch<User>('/leaderboard');
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2">
        <h1>Leaderboard</h1>
      </div>
      <div className="bg-gray-100">
        {(!error && !loading) && <LeaderboardTable users={data ?? []} />}
        {error && (
          <div className="max-w-7xl mx-auto px-4 pt-4 sm:px-6">
            <p className="text-error">{error}</p>
          </div>
        )}
      </div>
    </>
  );
}
