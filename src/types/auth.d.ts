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
