import LeaderboardTable from '../components/LeaderboardTable';

import useDataFetch from '../hooks/useDataFetch';

export default function LeaderboardPage() {
  const { data } = useDataFetch<User[]>('/leaderboard');
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2">
        <h1>Leaderboard</h1>
      </div>
      <div className="bg-gray-100">
        <LeaderboardTable users={data ?? []} />
      </div>
    </>
  );
}
