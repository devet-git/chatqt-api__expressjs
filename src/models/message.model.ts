import { Schema, model } from 'mongoose';

const messageSchema = new Schema<IMessage>({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  replyTo: { type: Schema.Types.Mixed },
});

const Message = model<IMessage>('messages', messageSchema);
export default Message;
