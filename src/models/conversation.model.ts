import { Schema, model } from 'mongoose';
interface IConversation {
  member: string[];
}
const conversationSchema = new Schema<IConversation>({
  member: { type: [], required: true },
});
const Conversation = model<IConversation>('conversations', conversationSchema);
export default Conversation;
