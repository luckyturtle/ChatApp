export type User = {
  id: string;
  username: string;
  name: string;
};

export type Chat = {
  id: string;
  user: User;
  content: string;
  date: Date;
};
