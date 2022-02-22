/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageModel from '../mongoose/messages/MessageModel';
import Message from '../models/messages/Message';
import MessageDaoI from '../interfaces/MessageDaoI';

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
  /**
   * Creates singleton DAO instance
   * @returns MessageDao
   */
  private static messageDao: MessageDao | null = null;
  public static getInstance = (): MessageDao => {
    if (MessageDao.messageDao === null) {
      MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
  };
  private constructor() {}

  /**
   * Create a Message by a specified user
   * @param {string} to primary key of User object, as a receiver
   * @param {string} from primary key of User object, as a sender
   * @param {Message} message a Message object that contains message related properties
   * @returns Promise to be notified when the Message is created
   */
  userMessagesUser = async (
    senderUid: string,
    receiverUid: string,
    message: Message
  ): Promise<Message> =>
    MessageModel.create({ ...message, to: receiverUid, from: senderUid });

  /**
   * Uses MessageModel to retrieve all message documents that a
   * specified user sent from messages collection
   * @returns Promise To be notified when the messages are retrieved from
   * database
   */
  findAllSentMessages = async (uid: string): Promise<Message[]> =>
    MessageModel.find({ from: uid });

  /**
   * Uses MessageModel to retrieve all message documents that a
   * specified user received from messages collection
   * @returns Promise To be notified when the messages are retrieved from
   * database
   */
  findAllReceivedMessages = async (uid: string): Promise<Message[]> =>
    MessageModel.find({ to: uid });

  /**
   * delete a specified message
   * @param {string} mid primary key of that message
   * @returns Promise to be notified when the Message is deleted
   */
  deleteMessage = async (mid: string): Promise<any> =>
    MessageModel.deleteOne({ _id: mid });

  /**
   * find a specified message
   * @param {string} mid primary key of that message
   * @returns Promise to be notified when the Message is found
   */
  findMessageById = async (mid: string): Promise<Message> =>
    MessageModel.findById(mid);

  /**
   * delete all messages sent by a specified user
   * @param {string} uid primary key of that user
   * @returns Promise to be notified when the Messages are deleted
   */
  deleteAllSentMessages = async (uid: string): Promise<any> =>
    MessageModel.deleteMany({ from: uid });
}
