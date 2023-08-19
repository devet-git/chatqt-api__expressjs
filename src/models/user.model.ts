import { Schema, model } from 'mongoose';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: () => isEmail,
    //   message: 'Email validation failed',
    // },
  },
  avatar: String,
});

const User = model<IUser>('users', userSchema);
export default User;
