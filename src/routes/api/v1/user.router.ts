import UserController from '@src/controllers/user.controller';
import AuthMiddleware from '@src/middlewares/auth.middleware';
import { Router } from 'express';

const userRouter = Router();
userRouter.use(AuthMiddleware.checkAccessToken);
userRouter.route('/').get(UserController.get).post(UserController.create);
userRouter.route('/:userId').get(UserController.getById);
export default userRouter;
