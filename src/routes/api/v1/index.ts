import { Router } from 'express';
import userRouter from './user.router';
import authRouter from './auth.router';

const apiv1 = Router();

apiv1.use('/users', userRouter);
apiv1.use('/auth', authRouter);

export default apiv1;
