import { Request, Response } from 'express';
import ServiceBase from './service.base';
import User from '@src/models/user.model';

class Service extends ServiceBase {
  public async getAll(): Promise<IUser[]> {
    const res = await User.find();
    return res;
  }
}
const UserService = new Service();
export default UserService;
