/**
 * @file implements the data model to represent messages in the database
 */

import mongoose, { Schema } from 'mongoose';
import Message from '../../models/messages/Message';

const MessageSchema = new mongoose.Schema<Message>(
  {
    message: { type: String, required: true },
    sentOn: { type: Date, default: Date.now },
    to: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    from: { type: Schema.Types.ObjectId, ref: 'UserModel' },
  },
  { collection: 'messages' }
);
export default MessageSchema;
