import { useEffect, useState } from 'react';

import users from '../_demodata/users';

type FetchState<T> = {
  loading: boolean;
  data?: T[];
  error: boolean | string;
};

const demoData: Record<string, unknown[]> = {
  '/leaderboard': users,
};

export default function useDataFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    loading: true,
    error: false,
    data: undefined,
  });
  const fetcher = () => Promise.resolve(demoData[url])
    .then((data: T[]) => setState({
      loading: false,
      error: false,
      data,
    }))
    .catch(({ message: error }) => setState({
      error,
      loading: false,
      data: undefined,
    }));

  useEffect(() => {
    fetcher().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
