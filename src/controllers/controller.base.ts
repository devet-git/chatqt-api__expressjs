import { Request, Response } from 'express';

export default abstract class ControllerBase {
  protected abstract get(req: Request, res: Response): void;
  protected abstract getById(req: Request, res: Response): void;
  protected abstract create(req: Request, res: Response): void;
  protected abstract update(req: Request, res: Response): void;
  protected abstract delete(req: Request, res: Response): void;
}

/*
class Controller extends ControllerBase {
  public async get(req: Request, res: Response): Promise<void> {
    
    res.status(200).json();
  }
  public async getById(req: Request, res: Response): Promise<void> {
    res.status(200).json();
  }

  public async create(req: Request, res: Response): Promise<void> {
    
  }

  public update(req: Request, res: Response): void {
    res.status(200).send('ahihi');
  }

  public delete(req: Request, res: Response): void {
    res.status(200).send('ahihi');
  }
}
const AuthController = new Controller();
export default AuthController;
 */
