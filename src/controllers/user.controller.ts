import { Request, Response } from 'express';
import ControllerBase from './controller.base';
import UserService from '@src/services/user.service';

class Controller extends ControllerBase {
  public get(req: Request, res: Response): void {
    const users = UserService.getAll();
    res.status(200).json(users);
  }
  public getById(req: Request, res: Response): void {
    res.status(200).send('ahihi');
  }
  public create(req: Request, res: Response): void {
    res.status(201).json();
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
