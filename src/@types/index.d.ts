type Nullable<T> = T | null;

type Action<T> = {
  type: string;
  payload: T;
};

type User = {
  id?: number;
  avatar?: string;
  login: string;
  email: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  score?: number;
};
