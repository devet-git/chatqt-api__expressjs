import jwt from 'jsonwebtoken';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ResponseObject } from '@src/other/classes';
import { NextFunction, Request, Response } from 'express';
import { jwtConst } from '@src/constants/auth.const';
import AuthUtil from '@src/utils/auth.util';
import User from '@src/models/user.model';

class Middleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const accessToken = req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json(
          ResponseObject.error({ errors: 'No token, authorization denied' })
        );
    }
    try {
      const decoded = jwt.verify(
        accessToken,
        jwtConst.SECRET_KEY
      ) as IDecodedToken;
      const existedUser = await User.findOne({ email: decoded.email });
      if (existedUser) {
        req.userEmail = decoded.email;
        next();
      }
    } catch (error) {
      res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json(ResponseObject.error({ message: 'Token is not valid' }));
    }
  }
  public checkRefreshToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies as { refreshToken: string };

    if (AuthUtil.isValidToken(refreshToken)) {
      req.refreshToken = refreshToken;
      next();
    } else {
      return res.status(HttpStatusCodes.BAD_REQUEST).json(
        ResponseObject.error({
          errors: 'Your refresh token is not valid. Please login again!',
        })
      );
    }
  }
}

const AuthMiddleware = new Middleware();
export default AuthMiddleware;