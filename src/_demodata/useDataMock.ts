import { useEffect, useState } from 'react';

import forum from './forum';
import users from './users';

type FetchState<T> = {
  loading: boolean;
  data?: T;
  error: boolean | string;
};

const demoData: Record<string, unknown> = {
  users,
  forum,
};

export default function useDataMock<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    loading: true,
    error: false,
    data: undefined,
  });

  const fetcher = () => new Promise((resolve) => {
    const data = demoData[url];
    const isSuccess = Math.random() < 0.4;
    if (isSuccess) {
      resolve(data);
    }
    throw new Error('Empty Response');
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

  useEffect(() => {
    fetcher().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
