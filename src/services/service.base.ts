export default abstract class ServiceBase {
  protected abstract getAll(): IUser[] | Promise<IUser[]>;
}
