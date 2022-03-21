import { useEffect, useState } from 'react';

import users from '../_demodata/users';
import forum from '../_demodata/forum';

type FetchState<T> = {
  loading: boolean;
  data?: T;
  error: boolean | string;
};

const demoData: Record<string, unknown> = {
  '/leaderboard': users,
  '/forum': forum,
};

export default function useDataFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    loading: true,
    error: false,
    data: undefined,
  });

  let fetcher = () => fetch(`https://ya-praktikum.tech/api/v2${url}`).then((res) => res.json());
  if (!url.includes('/user/')) {
    fetcher = () => new Promise((resolve, reject) => {
      const data = demoData[url];
      const isSuccess = Math.random() < 0.8;
      if (isSuccess) {
        resolve(data);
      }
      reject();
    })
      .then((data: T) => setState({
        loading: false,
        error: false,
        data,
      }))
      .catch((error) => setState({
        error,
        loading: false,
        data: undefined,
      }));
  }

  useEffect(() => {
    fetcher().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
