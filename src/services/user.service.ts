import ServiceBase from './service.base';
import User from '@src/models/user.model';

class Service extends ServiceBase {
  public async getAll(): Promise<IUser[]> {
    const res = await User.find();
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
