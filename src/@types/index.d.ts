type User = {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password?: string;
};

type ThreadComment = {
  content: string;
  user: User;
  date: Date;
};

type Thread = {
  id: number;
  date: Date;
  title: string;
  content: string;
  comments: ThreadComment[];
};
