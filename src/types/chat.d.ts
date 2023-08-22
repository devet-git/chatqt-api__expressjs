type TConversationMember = {
  id: string;
  name: string;
  aliasName?: string;
};

interface IConversation {
  name?: string;
  member: ConversationMember[];
  type: 'personal' | 'group';
}

interface IMessage {
  conversationId: string;
  userId: string;
  content: string;
  replyTo?: IMessage;
}

interface IConversationResponse extends IConversation {
  content: IMessage[];
}
