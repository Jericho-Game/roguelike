import LeaderboardTable from '../components/LeaderboardTable';

import useDataFetch from '../hooks/useDataFetch';

export default function LeaderboardPage() {
  const { data } = useDataFetch<User>('/leaderboard');
  return (
    <LeaderboardTable users={data ?? []} />
  );
}
