import Message from '@src/models/message.model';

class Service {
  public async getAllConversationByUser() {}
  public async addMessage({
    userId,
    conversationId,
    content,
    replyTo,
  }: IMessage) {
    await Message.create({ conversationId, userId, content, replyTo });
  }
}
const ConversationService = new Service();
export default ConversationService;
