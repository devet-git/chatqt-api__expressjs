import { ELoginStatus } from '@src/constants/auth.const';
import { Schema, model } from 'mongoose';

const loginHistorySchema = new Schema<ILoginHistory>({
  userEmail: { type: String, required: true },
  userAgent: { type: String, required: true },
  deviceType: { type: String, required: true },
  ip: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: ELoginStatus.ACTIVE },
});

const LoginHistory = model<ILoginHistory>(
  'login_histories',
  loginHistorySchema
);

export default LoginHistory;
