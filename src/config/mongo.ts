import mongoose from 'mongoose';
const connectMongodb = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatqt');
};
export default connectMongodb;
