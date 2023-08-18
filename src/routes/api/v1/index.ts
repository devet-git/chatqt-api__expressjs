import { Router } from 'express';
import userRouter from './user.router';

const apiv1 = Router();

apiv1.use('/users', userRouter);

export default apiv1;
