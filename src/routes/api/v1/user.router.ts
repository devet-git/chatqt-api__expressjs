import UserController from '@src/controllers/user.controller';
import { Router } from 'express';

const userRouter = Router();
userRouter.route('/').get(UserController.get).post(UserController.create);
userRouter.route('/:userId').get(UserController.getById);
export default userRouter;
