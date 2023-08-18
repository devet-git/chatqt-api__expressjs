interface IUser {
  name: string;
  username: string;
  email: string;
  avatar?: string;
  role?: 'user' | 'admin';
}
