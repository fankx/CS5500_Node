/**
 * @file implements the data model to represent messages in the middle tier
 */
import User from '../users/User';

export default interface Message {
  message: string;
  to: User;
  from: User;
  sentOn: Date;
}
