import { Request, Response } from 'express';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ResponseObject } from '@src/other/classes';
import AuthService from '@src/services/auth.service';
import { cookieConst } from '@src/constants/auth.const';

class Controller {
  public async login(req: Request, res: Response): Promise<void> {
    const clientData = req.body as IUserLogin;
    try {
      const responseData = await AuthService.login(clientData);
      await AuthService.saveLoginHistory(req, responseData.user.email);

      res.cookie('refreshToken', responseData.refreshToken, {
        httpOnly: true,
        maxAge: cookieConst.REFRESH_TOKEN_EXPIRED_TIME,
      });
      res.cookie('accessToken', responseData.accessToken, {
        httpOnly: true,
        maxAge: cookieConst.ACCESS_TOKEN_EXPIRED_TIME,
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
      await AuthService.saveLoginHistory(req, createdUser.user.email);

      // todo: set refresh token to cookie
      res.cookie('refreshToken', createdUser.refreshToken, {
        httpOnly: true,
        maxAge: cookieConst.REFRESH_TOKEN_EXPIRED_TIME,
      });
      res.cookie('accessToken', createdUser.accessToken, {
        httpOnly: true,
        maxAge: cookieConst.ACCESS_TOKEN_EXPIRED_TIME,
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

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: cookieConst.ACCESS_TOKEN_EXPIRED_TIME,
      });

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
  public async logout(req: Request, res: Response): Promise<void> {
    const email = req.userEmail;
    const userAgent = req.headers['user-agent'];
    await AuthService.logout(email!, userAgent!);
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res
      .status(HttpStatusCodes.OK)
      .json(ResponseObject.success({ message: 'You are logged out!' }));
  }
}
const AuthController = new Controller();
export default AuthController;
