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
   * Given specified tuitId to find all the users who like it.
   * @param {string} tid the specified tuit ID, the primary key of tuit
   * @returns Promise To be notified when the users are retrieved from
   * database
   */
  findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
    LikeModel.find({ tuit: tid }).populate('likedBy').exec();

  /**
   * Given specified userId to find all the tuits they liked.
   * @param {string} uid the specified user ID, the primary key of user
   * @returns Promise To be notified when the tuits are retrieved from
   * database
   */
  findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
    LikeModel.find({ likedBy: uid })
      .populate({
        path: 'tuit',
        populate: {
          path: 'postedBy',
        },
      })
      .exec();

  /**
   * Specific user like a certain tuit
   * @param {string} uid the specified user ID, the primary key of user
   * @param {string} tid the specified tuit ID, the primary key of tuit
   * @returns Promise To be notified when likes are created in the database
   */
  userLikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.create({ tuit: tid, likedBy: uid });

  /**
   * check if there's a likes document in the database for
   * user/tuit combination
   * @param uid specified User ID, the primary key of user
   * @param tid specified Tuit ID, the primary key of tuit
   */
  findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.findOne({ tuit: tid, likedBy: uid });

  /**
   * Specific user unlike a certain tuit
   * @param {string} uid the specified user ID, the primary key of user
   * @param {string} tid the specified tuit ID, the primary key of tuit
   * @returns Promise To be notified when likes are deleted in the database
   */
  userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.deleteOne({ tuit: tid, likedBy: uid });

  /**
   * count how many users liked the specific tuit
   * @param tid the specified tuit ID, the primary key of tuit
   */
  countHowManyLikedTuit = async (tid: string): Promise<any> =>
    LikeModel.count({ tuit: tid });
}
