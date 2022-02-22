import Message from '../models/messages/Message';

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
  userMessagesUser(
    senderUid: string,
    receiverUid: string,
    message: Message
  ): Promise<Message>;
  findAllSentMessages(uid: string): Promise<Message[]>;
  findAllReceivedMessages(uid: string): Promise<Message[]>;
  deleteMessage(mid: string): Promise<Message[]>;
  findMessageById(mid: string): Promise<Message>;
  deleteAllSentMessages(uid: string): Promise<Message[]>;
}
