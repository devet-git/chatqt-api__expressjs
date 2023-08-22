import { EConversation } from '@src/constants/chat.const';
import { Schema, model } from 'mongoose';

const conversationSchema: Schema = new Schema<IConversation>({
  name: {
    type: String,
    require: function (this: IConversation) {
      return this.type === EConversation.Group;
    },
  },
  member: { type: Schema.Types.Mixed, required: true },
  type: {
    type: String,
    enum: EConversation,
    default: EConversation.Personal,
    required: true,
  },
});
const Conversation = model<IConversation>('conversations', conversationSchema);
export default Conversation;
