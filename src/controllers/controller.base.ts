import { Request, Response } from 'express';

export default abstract class ControllerBase {
  protected abstract get(req: Request, res: Response): void;
  protected abstract getById(req: Request, res: Response): void;
  protected abstract create(req: Request, res: Response): void;
  protected abstract update(req: Request, res: Response): void;
  protected abstract delete(req: Request, res: Response): void;
}
