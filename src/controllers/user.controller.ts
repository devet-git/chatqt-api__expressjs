import { Request, Response } from 'express';

class Controller {
  public listAllUsers(req: Request, res: Response) {
    res.status(200).send('ahihi');
  }
}
const UserController = new Controller();
export default UserController;
