interface IUser {
  name?: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'USER' | 'ADMIN';
  refreshToken: string;
}
interface IUserResponse {
  name?: string;
  email: string;
  avatar?: string;
  role: 'USER' | 'ADMIN';
  refreshToken: string;
}
interface IUserLogin {
  email: string;
  password: string;
}
interface IUserRegister extends IUserLogin {}
