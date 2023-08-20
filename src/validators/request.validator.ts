import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ResponseObject } from '@src/other/classes';

export const requestValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json(
      ResponseObject.error({
        errors: errors.array(),
      })
    );
  }
  next();
};
