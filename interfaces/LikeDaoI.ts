import Like from '../models/likes/Like';

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface LikeDaoI {
  findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
  findAllTuitsLikedByUser(uid: string): Promise<Like[]>;
  userLikesTuit(uid: string, tid: string): Promise<Like>;
  userUnlikesTuit(uid: string, tid: string): Promise<any>;
  findUserLikesTuit(uid: string, tid: string): Promise<Like>;
}
