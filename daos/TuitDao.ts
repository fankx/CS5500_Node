/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from '../mongoose/tuits/TuitModel';
import Tuit from '../models/tuits/Tuit';
import TuitDaoI from '../interfaces/TuitDaoI';

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
  /**
   * Creates singleton DAO instance
   * @returns TuitDao
   */
  private static tuitDao: TuitDao | null = null;
  public static getInstance = (): TuitDao => {
    if (TuitDao.tuitDao === null) {
      TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
  };
  private constructor() {}

  /**
   * Uses TuitModel to retrieve all tuit documents from tuits collection
   * @returns Promise To be notified when the tuits are retrieved from
   * database
   */
  findAllTuits = async (): Promise<Tuit[]> =>
    TuitModel.find().populate('postedBy').exec();

  /**
   * Uses TuitModel to retrieve all tuit documents by specified user from tuits collection
   * @param {string} uid User's primary key
   * @returns Promise To be notified when the tuits are retrieved from
   * database
   */
  findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
    TuitModel.find({ postedBy: uid })
      .sort({ postedOn: -1 })
      .populate('postedBy')
      .exec();

  /**
   * Uses TuitModel to retrieve specified tuit documents from tuits collection
   * @param {string} tid Tuit's primary key
   * @returns Promise To be notified when the tuits are retrieved from
   * database
   */
  findTuitById = async (tid: string): Promise<any> =>
    TuitModel.findById(tid).populate('postedBy').exec();
  /**
   * Create a Tuit by a specified user
   * @param {string} uid primary key of User object
   * @param {Tuit} tuit a Tuit object that contains tuit related properties
   * @returns Promise to be notified when the Tuit is created
   */
  createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
    TuitModel.create({ ...tuit, postedBy: uid });
  /**
   * update a tuit via the specified userId
   * @param {string}uid  primary key of a user object
   * @param {Tuit}tuit updated Tuit properties
   * @returns Promise to be notified when the Tuit is updated
   */
  updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
    TuitModel.updateOne({ _id: uid }, { $set: tuit });
  /**
   * delete a specified tuit
   * @param {string} tid primary key of tuitID
   * @returns Promise to be notified when the Tuit is deleted
   */
  deleteTuit = async (tid: string): Promise<any> =>
    TuitModel.deleteOne({ _id: tid });

  /**
   * delete a specified tuit by its content
   * @param {string} tc tuit's content
   * @returns Promise to be notified when the Tuit is deleted
   */
  deleteTuitByContent = async (tc: string): Promise<any> =>
    TuitModel.deleteOne({ tuit: tc });

  /**
   * update a tuit like via the specified tid and its status
   * @param {string} tid  primary key of a tuit object
   * @param {any} newStats updated Tuit properties(likes, dislike, retuit, retweets)
   * @returns Promise to be notified when the Tuit is updated
   */
  updateLikes = async (tid: string, newStats: any): Promise<any> =>
    TuitModel.updateOne({ _id: tid }, { $set: { stats: newStats } });

  /**
   * update a tuit dislike via the specified tid and its status
   * @param {string} tid  primary key of a tuit object
   * @param {any} newStats updated Tuit properties(likes, dislike, retuit, retweets)
   * @returns Promise to be notified when the Tuit is updated
   */
  updateDislikes = async (tid: string, newStats: any): Promise<any> =>
    TuitModel.updateOne({ _id: tid }, { $set: { stats: newStats } });
}
