import { Request, Response } from 'express';
import ControllerBase from './controller.base';
import UserService from '@src/services/user.service';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ResponseObject } from '@src/other/classes';

class Controller extends ControllerBase {
  public async get(req: Request, res: Response): Promise<void> {
    const users = await UserService.getAll();
    res.status(200).json(users);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const user = await UserService.getById(userId);
    res.status(200).json(user);
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const clientData: IUser = req.body as IUser;
      const createdUser = await UserService.createOne(clientData);
      res
        .status(HttpStatusCodes.CREATED)
        .json(ResponseObject.success({ data: createdUser }));
    } catch (error) {
      res.status(HttpStatusCodes.BAD_REQUEST).json(
        ResponseObject.error({
          error: error instanceof Error && error.message,
        })
      );
    }
  }

  public update(req: Request, res: Response): void {
    res.status(200).send('ahihi');
  }

  public delete(req: Request, res: Response): void {
    res.status(200).send('ahihi');
  }
}
const UserController = new Controller();
export default UserController;
