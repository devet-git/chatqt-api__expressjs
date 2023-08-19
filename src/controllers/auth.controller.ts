import { Request, Response } from 'express';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ResponseObject } from '@src/other/classes';
import AuthService from '@src/services/auth.service';
import { jwtConst } from '@src/constants/auth.const';

class Controller {
  public async login(req: Request, res: Response): Promise<void> {
    const clientData = req.body as IUserLogin;
    try {
      const responseData = await AuthService.login(clientData);
      res.cookie('refreshToken', responseData.refreshToken, {
        httpOnly: true,
        maxAge: jwtConst.REFRESH_TOKEN_EXPIRED_TIME,
      });
      res.status(HttpStatusCodes.OK).json(
        ResponseObject.success({
          data: responseData,
          message: 'Login successfully',
        })
      );
    } catch (error) {
      res.status(HttpStatusCodes.BAD_REQUEST).json(
        ResponseObject.error({
          errors: error instanceof Error && error.message,
        })
      );
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    const clientData = req.body as IUserRegister;
    try {
      const createdUser = await AuthService.register(clientData);

      // todo: set refresh token to cookie
      res.cookie('refreshToken', createdUser.refreshToken, {
        httpOnly: true,
        maxAge: 3600 * 24,
      });
      res
        .status(HttpStatusCodes.CREATED)
        .json(ResponseObject.success({ data: createdUser }));
    } catch (error) {
      res.status(HttpStatusCodes.BAD_REQUEST).json(
        ResponseObject.error({
          errors: error instanceof Error && error.message,
        })
      );
    }
  }

  public async getAccessToken(req: Request, res: Response): Promise<void> {
    const refreshToken = req.refreshToken as string;
    try {
      const accessToken = await AuthService.getAccessToken(refreshToken);
      res
        .status(HttpStatusCodes.OK)
        .json(ResponseObject.success({ data: { accessToken } }));
    } catch (error) {
      res.status(HttpStatusCodes.BAD_REQUEST).json(
        ResponseObject.error({
          errors: error instanceof Error && error.message,
        })
      );
    }
  }
}
const AuthController = new Controller();
export default AuthController;
