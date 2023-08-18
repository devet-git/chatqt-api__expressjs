import UserController from '@src/controllers/user.controller';
import { Router } from 'express';

const userRouter = Router();
userRouter.route('/').get(UserController.get);
export default userRouter;
