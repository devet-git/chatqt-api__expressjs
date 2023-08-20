type AuthResponseType = {
  user: IUserResponse;
  accessToken: string;
  refreshToken: string;
};

interface IDecodedToken extends JwtPayload {
  email: string;
}

interface ITokenPayload {
  email: string;
}
interface ILoginHistory {
  userEmail: string;
  userAgent: string;
  ip: string;
  deviceType: string;
  timestamp: Date;
  status: 'EXPIRED' | 'ACTIVE';
}
