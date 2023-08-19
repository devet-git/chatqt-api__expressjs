import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ResponseObject } from '@src/other/classes';

export const requestValidator = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HttpStatusCodes.BAD_REQUEST).json(
      ResponseObject.error({
        error: errors.array(),
      })
    );
    return;
  }
};
