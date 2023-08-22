interface IUser {
  name?: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'USER' | 'ADMIN';
  refreshToken: string;
  status: 'UNVERIFIED' | 'ACTIVE' | 'DELETED';
}
interface IUserResponse {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
  role: 'USER' | 'ADMIN';
  status: 'UNVERIFIED' | 'ACTIVE' | 'DELETED';
}
interface IUserLogin {
  email: string;
  password: string;
}
interface IUserRegister extends IUserLogin {
  name?: string;
}
