import LeaderboardTable from '../components/LeaderboardTable';

import useDataMock from '../_demodata/useDataMock';

export default function LeaderboardPage() {
  const { data } = useDataMock<User[]>('users');
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
