import { jwtConst } from '@src/constants/auth.const';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export default class AuthUtil {
  public static generateAccessToken(payload: ITokenPayload): string {
    return jwt.sign(payload, jwtConst.SECRET_KEY, {
      expiresIn: jwtConst.ACCESS_TOKEN_EXPIRED_TIME,
    });
  }
  public static generateRefreshToken(payload: ITokenPayload): string {
    return jwt.sign(payload, jwtConst.SECRET_KEY, {
      expiresIn: jwtConst.REFRESH_TOKEN_EXPIRED_TIME,
    });
  }

  public static decodedToken(token: string): IDecodedToken {
    try {
      const decoded = jwt.verify(token, jwtConst.SECRET_KEY) as IDecodedToken;
      return decoded;
    } catch (error) {
      throw new Error('Decode token has failured');
    }
  }
  /**
   * Check the JWT token if it valid and is not expire
   * @date 8/20/2023 - 10:15:35 AM
   *
   * @public
   * @static
   * @param {string} token
   * @returns {boolean}
   */
  public static isValidToken(token: string): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    try {
      const decoded = jwt.verify(token, jwtConst.SECRET_KEY) as JwtPayload;
      if (currentTime < decoded.exp!) return true;
      else return false;
    } catch (error) {
      return false;
    }
  }
  /**
   * Check the password to see if it matches the regex pattern
   * @date 8/20/2023 - 10:13:22 AM
   *
   * @public
   * @static
   * @param {string} password
   * @returns {boolean}
   */
  public static isValidPassword(password: string): boolean {
    const regex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#!%*?&])[A-Za-z\\d@#$!%*?&]{8,}$'
    );
    return regex.test(password);
  }

  /**
   * Hash password
   * @date 8/20/2023 - 10:13:04 AM
   *
   * @public
   * @static
   * @async
   * @param {string} password
   * @returns {Promise<string>}
   */
  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error('Password encoder failure');
    }
  }
  /**
   * Compare password to hashed password
   * @date 8/20/2023 - 10:12:13 AM
   *
   * @public
   * @static
   * @async
   * @param {string} password
   * @param {string} hashedPassword
   * @returns {Promise<boolean>}
   */
  public static async compareHashedPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      return false;
    }
  }
}
