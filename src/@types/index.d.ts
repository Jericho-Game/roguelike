declare module '*.gif';
declare module '*.svg';

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

type ThreadComment = {
  id: number;
  user: User;
  content: string;
  date: Date | string;
};

type Thread = {
  id: number;
  date: Date | string;
  title: string;
  content: string;
  category: 'main' | 'questions' | 'versions';
  comments: ThreadComment[];
};
