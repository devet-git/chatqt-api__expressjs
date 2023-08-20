import { EConversation } from '@src/constants/chat.const';
import { IConversation } from '@src/types/chat';
import { Schema, model } from 'mongoose';

const conversationSchema = new Schema<IConversation>({
  member: { type: [], required: true },
  type: { default: EConversation.Personal, required: true },
});
const Conversation = model<IConversation>('conversations', conversationSchema);
export default Conversation;
