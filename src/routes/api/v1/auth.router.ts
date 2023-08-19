import AuthController from '@src/controllers/auth.controller';
import AuthMiddleware from '@src/middlewares/auth.middleware';
import { requestValidator } from '@src/validators/request.validator';
import { Router } from 'express';
import { body } from 'express-validator';

const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is not valid'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .matches(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#!%*?&])[A-Za-z\\d@#$!%*?&]{8,}$'
      )
    )
    .withMessage(
      `Password requires at least 8 characters and
			must include lowercase letters, uppercase letters, numbers and special characters`
    ),
];
const validateRegister = [
  ...validateLogin,
  body('username')
    .if(body('username').exists())
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters long'),
];
const authRouter = Router();

// implement
authRouter.post(
  '/login',
  [...validateLogin, requestValidator],
  AuthController.login
);
authRouter.post(
  '/register',
  [...validateRegister, requestValidator],
  AuthController.register
);
authRouter.get(
  '/access-token',
  AuthMiddleware.checkRefreshToken,
  AuthController.getAccessToken
);

export default authRouter;
