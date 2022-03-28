/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from '../interfaces/DislikeDaoI';
import DislikeModel from '../mongoose/dislikes/DislikeModel';
import Dislike from '../models/dislikes/Dislike';

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao Private single instance of dislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
  /**
   * Creates singleton DAO instance
   * @returns DislikeDao
   */
  private static dislikeDao: DislikeDao | null = null;
  public static getInstance = (): DislikeDao => {
    if (DislikeDao.dislikeDao === null) {
      DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
  };
  private constructor() {}

  /**
   * Given specified tuitId to find the users who dislike it.
   * @param {string} tid the specified tuit ID, the primary key of tuit
   * @returns Promise To be notified when the users are retrieved from
   * database
   */
  findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
    DislikeModel.find({ tuit: tid }).populate('dislikedBy').exec();
  /**
   * check if there's a dislikes document in the database for
   * user/tuit combination
   * @param uid specified User ID, the primary key of user
   * @param tid specified Tuit ID, the primary key of tuit
   */
  findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
    DislikeModel.findOne({ tuit: tid, dislikedBy: uid });
  /**
   * Given specified userId to find the users who dislike it.
   * @param {string} uid the specified user ID, the primary key of user
   * @returns Promise To be notified when the tuits are retrieved from
   * database
   */
  findAllTuitsDislikedByUser = async (uid: string) =>
    DislikeModel.find({ dislikedBy: uid })
      .populate({
        path: 'tuit',
        populate: {
          path: 'postedBy',
        },
      })
      .exec();

  /**
   * Specific user dislike certain tuit
   * @param {string} uid the specified user ID, the primary key of user
   * @param {string} tid the specified tuit ID, the primary key of tuit
   * @returns Promise To be notified when dislikes are created in the database
   */
  userDislikesTuit = async (uid: string, tid: string): Promise<Dislike> =>
    DislikeModel.create({ tuit: tid, dislikedBy: uid });

  /**
   * Specific user undislike certain tuit
   * @param {string} uid the specified user ID, the primary key of user
   * @param {string} tid the specified tuit ID, the primary key of tuit
   * @returns Promise To be notified when dislikes are deleted in the database
   */
  userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
    DislikeModel.deleteOne({ tuit: tid, dislikedBy: uid });

  /**
   * count how many users disliked a tuit
   * @param tid the specified tuit ID, the primary key of tuit
   */
  countHowManyDislikedTuit = async (tid: string): Promise<any> =>
    DislikeModel.count({ tuit: tid });
}
