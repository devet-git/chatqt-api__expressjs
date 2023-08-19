import { Request, Response } from 'express';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ResponseObject } from '@src/other/classes';
import AuthService from '@src/services/auth.service';
import { requestValidator } from '@src/validators/request.validator';

class Controller {
  public async login(req: Request, res: Response): Promise<void> {
    requestValidator(req, res);
    try {
      const data: IUserLogin = req.body as IUserLogin;
      const responseData = await AuthService.login(data);
      res.status(HttpStatusCodes.OK).json(
        ResponseObject.success({
          data: responseData,
          message: 'Login successfully',
        })
      );
    } catch (error) {
      res.status(HttpStatusCodes.BAD_REQUEST).json(
        ResponseObject.error({
          error: error instanceof Error && error.message,
        })
      );
    }
  }
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const clientData: IUser = req.body as IUser;
      const createdUser = await AuthService.register(clientData);
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
}
const AuthController = new Controller();
export default AuthController;
