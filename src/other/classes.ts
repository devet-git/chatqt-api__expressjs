/**
 * Miscellaneous shared classes go here.
 */

import HttpStatusCodes from '@src/constants/HttpStatusCodes';

/**
 * Error with status code and message
 */
export class RouteError extends Error {
  public status: HttpStatusCodes;

  public constructor(status: HttpStatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}

type ResponseType = {
  statusCode?: HttpStatusCodes;
  message?: string;
  data?: unknown;
  error?: unknown;
};
export class ResponseObject {
  public static success({ statusCode, message, data }: ResponseType) {
    return {
      timestamp: new Date(),
      statusCode: statusCode || HttpStatusCodes.OK,
      message: message || 'Successfully',
      data,
    };
  }
  public static error({ statusCode, message, error }: ResponseType) {
    return {
      timestamp: new Date(),
      statusCode: statusCode || HttpStatusCodes.BAD_REQUEST,
      message: message || 'Oops!! Unsuccessfully',
      error,
    };
  }
}

export class ResponseError extends Error {
  public error?: unknown;
  protected statusCode: number;
  public constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 400;
  }
}
