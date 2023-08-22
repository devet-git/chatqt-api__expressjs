import { ELoginStatus } from '@src/constants/auth.const';
import { ErrorMessage } from '@src/constants/message.const';
import LoginHistory from '@src/models/login-history.model';
import User from '@src/models/user.model';
import AuthUtil from '@src/utils/auth.util';
import { Request } from 'express';

class Service {
  public async login(data: IUserLogin): Promise<AuthResponseType> {
    const existedUser = await User.findOne({ email: data.email });
    if (!existedUser) throw new Error('User is not existed');

    const isPasswordMatch = await AuthUtil.compareHashedPassword(
      data.password,
      existedUser.password
    );
    if (!isPasswordMatch) throw new Error('Your password is not match');

    const accessToken = AuthUtil.generateAccessToken({
      email: existedUser.email,
    });
    const refreshToken = AuthUtil.generateRefreshToken({
      email: existedUser.email,
    });
    // todo: update refresh token
    existedUser.refreshToken = refreshToken;
    await existedUser.save();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...responseUser } = existedUser.toObject();
    return {
      user: { ...responseUser, id: responseUser._id.toString() },
      accessToken,
      refreshToken,
    } as AuthResponseType;
  }

  public async register(data: IUserRegister): Promise<AuthResponseType> {
    // const existedUser = await User.findOne({
    //   $or: [{ email: data.email }, { username: data.username }],
    // });
    const existedUserWithEmail = await User.findOne({ email: data.email });
    if (existedUserWithEmail)
      throw new Error(`User with email '${data.email}' existed`);

    const hashedPassword = await AuthUtil.hashPassword(data.password);
    const accessToken = AuthUtil.generateAccessToken({ email: data.email });
    const refreshToken = AuthUtil.generateRefreshToken({ email: data.email });
    const newUser = await User.create({
      ...data,
      password: hashedPassword,
      accessToken,
      refreshToken,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...responseUser } = newUser.toObject();
    return {
      user: { ...responseUser, id: responseUser._id.toString() },
      accessToken,
      refreshToken,
    } as AuthResponseType;
  }

  /**
   * Get access token from refresh token
   * @date 8/19/2023 - 6:24:12 PM
   *
   * @public
   * @param {string} refreshToken
   * @returns {string}
   */
  public async getAccessToken(refreshToken: string): Promise<string> {
    const decoded = AuthUtil.decodedToken(refreshToken);
    const user = await User.findOne({ email: decoded.email });

    if (!user || user.refreshToken !== refreshToken)
      throw new Error(ErrorMessage.Jwt.TOKEN_NOT_VALID);

    return AuthUtil.generateAccessToken({ email: user.email });
  }

  public async saveLoginHistory(
    req: Request,
    userEmail: string
  ): Promise<void> {
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const deviceType = userAgent?.toLowerCase().includes('mobile')
      ? 'mobile'
      : 'desktop';

    await LoginHistory.create({ userEmail, userAgent, deviceType, ip });
  }
  public async expiredLoginSession(email: string, userAgent: string) {
    await LoginHistory.findOneAndUpdate(
      { userEmail: email, userAgent },
      { status: ELoginStatus.EXPIRED }
    );
  }
  public async logout(email: string, userAgent: string) {
    await User.findOneAndUpdate({ email }, { refreshToken: '' });
    await this.expiredLoginSession(email, userAgent);
  }
}
const AuthService = new Service();
export default AuthService;
