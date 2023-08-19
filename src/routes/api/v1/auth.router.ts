import AuthController from '@src/controllers/auth.controller';
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
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters long'),
];
const authRouter = Router();

// implement
authRouter.post('/login', validateLogin, AuthController.login);
authRouter.post('/register', validateRegister, AuthController.register);

export default authRouter;
