export const jwtConst = {
  SECRET_KEY: 'HECHAOUWPxx.gssTT13944.JJHLLAPLWFMVxx1259XCVMN',
  ACCESS_TOKEN_EXPIRED_TIME: 3600, //1hour
  REFRESH_TOKEN_EXPIRED_TIME: 86400 * 30, //30day
};
export enum EUserRole {
  User = 'USER',
  Admin = 'ADMIN',
}
export enum ELoginStatus {
  EXPIRED = 'EXPIRED',
  ACTIVE = 'ACTIVE',
}
