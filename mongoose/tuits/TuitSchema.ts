/**
 * @file implements the data model to represent tuits in the database
 */

import mongoose, { Schema } from 'mongoose';
import Tuit from '../../models/tuits/Tuit';

const TuitSchema = new mongoose.Schema<Tuit>(
  {
    tuit: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    postedBy: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
      replies: { type: Number, default: 0 },
      retuits: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
    },
  },
  { collection: 'tuits' }
);
export default TuitSchema;
