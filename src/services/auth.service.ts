import User from '@src/models/user.model';

class Service {
  public async login(data: IUserLogin): Promise<LoginResponseType> {
    const existedUser = await User.findOne({ email: data.email });
    if (!existedUser) throw new Error('User is not existed');
    return {
      user: existedUser as IUser,
      accessToken: 'dasfas',
      refreshToken: 'afafsaf',
    } as LoginResponseType;
  }
  public async register(data: IUser): Promise<IUser> {
    const existedUser = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });
    if (existedUser)
      throw new Error(
        `User with ${
          data.email === existedUser.email
            ? 'email ' + existedUser.email
            : 'username ' + data.username
        } existed`
      );

    await User.create(data);
    return data;
  }
}
const AuthService = new Service();
export default AuthService;
