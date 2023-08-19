import { EUserRole } from '@src/constants/auth.const';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<IUser>({
  name: { type: String, default: '' },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: () => isEmail,
    //   message: 'Email validation failed',
    // },
  },
  password: { type: String, required: true },
  avatar: { type: String },
  role: { default: EUserRole.User, type: String, required: true },
  refreshToken: { type: String, required: true },
});

const User = model<IUser>('users', userSchema);
export default User;
