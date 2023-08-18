import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  username: string;
  email: string;
  avatar?: string;
}
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const User = model<IUser>('users', userSchema);
export default User;
