import ServiceBase from './service.base';
import User from '@src/models/user.model';

class Service extends ServiceBase {
  public async getAll(): Promise<IUserResponse[]> {
    const users = await User.find();
    const res: IUserResponse[] = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { refreshToken, password, ...resUser } = user.toObject();
      return { ...resUser, id: user._id.toString() } as IUserResponse;
    });
    return res;
  }

  public async getById(userId: string): Promise<IUser> {
    const res = await User.findById(userId);
    return res as IUser;
  }

  public async createOne(data: IUser): Promise<IUser> {
    const existedUser = await User.findOne({ email: data.email });
    if (existedUser)
      throw new Error(`User with email ${existedUser.email} existed`);

    await User.create(data);
    return data;
  }
}
const UserService = new Service();
export default UserService;
