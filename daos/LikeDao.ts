/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from '../interfaces/LikeDaoI';
import LikeModel from '../mongoose/likes/LikeModel';
import Like from '../models/likes/Like';

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of likeDao
 */
export default class LikeDao implements LikeDaoI {
  /**
   * Creates singleton DAO instance
   * @returns LikeDao
   */
  private static likeDao: LikeDao | null = null;
  public static getInstance = (): LikeDao => {
    if (LikeDao.likeDao === null) {
      LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
  };
  private constructor() {}

  /**
   * Given specified tuitId to find the users who like it.
   * @param {string} tid the specified tuit ID, the primary key of tuit
   * @returns Promise To be notified when the users are retrieved from
   * database
   */
  findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
    LikeModel.find({ tuit: tid }).populate('likedBy').exec();

  /**
   * Given specified userId to find the users who like it.
   * @param {string} uid the specified user ID, the primary key of user
   * @returns Promise To be notified when the tuits are retrieved from
   * database
   */
  findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
    LikeModel.find({ likedBy: uid }).populate('tuit').exec();

  /**
   * Specific user like certain tuit
   * @param {string} uid the specified user ID, the primary key of user
   * @param {string} tid the specified tuit ID, the primary key of tuit
   * @returns Promise To be notified when likes are created in the database
   */
  userLikesTuit = async (uid: string, tid: string): Promise<Like> =>
    LikeModel.create({ tuit: tid, likedBy: uid });

  /**
   * Specific user unlike certain tuit
   * @param {string} uid the specified user ID, the primary key of user
   * @param {string} tid the specified tuit ID, the primary key of tuit
   * @returns Promise To be notified when likes are deleted in the database
   */
  userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.deleteOne({ tuit: tid, likedBy: uid });
}
