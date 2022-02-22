/**
 * @file Controller RESTful Web service API for follows resource
 */
import { Express, Request, Response } from 'express';
import FollowDao from '../daos/FollowDao';
import FollowControllerI from '../interfaces/FollowControllerI';

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST api/users/:uid/followees/:auid   User follows another user</li>
 *     <li>DELETE api/users/:uid/followees/:auid User unfollows another user</li>
 *     <li>GET api/users/:uid/followees          User views a list of other users they
 *     are following</li>
 *     <li>GET api/users/:uid/followers          User views a list of other users that
 *     are following them</li>
 *     <li>DELETE api/users/:uid/followees       User unfollows all users</li>
 *     <li>DELETE api/users/:uid/followers       User removes all followers</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */

export default class FollowController implements FollowControllerI {
  private static followDao: FollowDao = FollowDao.getInstance();
  private static followController: FollowController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return TuitController
   */
  public static getInstance = (app: Express): FollowController => {
    if (FollowController.followController === null) {
      FollowController.followController = new FollowController();
      app.post(
        '/api/users/:uid/followees/:auid',
        FollowController.followController.userFollowsUser
      );
      app.delete(
        '/api/users/:uid/followees/:auid',
        FollowController.followController.userUnfollowsUser
      );
      app.get(
        '/api/users/:uid/followers',
        FollowController.followController.findAllUsersFollowers
      );
      app.get(
        '/api/users/:uid/followees',
        FollowController.followController.findAllUsersFollowees
      );
      app.delete(
        '/api/users/:uid/followers',
        FollowController.followController.deleteAllFollowers
      );
      app.delete(
        '/api/users/:uid/followees',
        FollowController.followController.deleteAllFollowees
      );
    }
    return FollowController.followController;
  };

  private constructor() {}

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters followerUid and followeeUid representing the follower
   * and followee
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new follows that was inserted in the
   * database
   */
  userFollowsUser = (req: Request, res: Response) =>
    FollowController.followDao
      .userFollowsUser(req.params.uid, req.params.auid)
      .then((follow) => res.json(follow));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters followerUid and followeeUid representing the follower
   * and followee
   * @param {Response} res Represents response to client, including status
   * on whether deleting the follow was successful or not
   */
  userUnfollowsUser = (req: Request, res: Response) =>
    FollowController.followDao
      .userUnfollowsUser(req.params.uid, req.params.auid)
      .then((status) => res.send(status));

  /**
   * Retrieves a list of other users they are following from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the followee's uid
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the follow objects
   */
  findAllUsersFollowers = (req: Request, res: Response) =>
    FollowController.followDao
      .findAllUsersFollowers(req.params.uid)
      .then((followers) => res.json(followers));

  /**
   * Retrieves a list of other users that are following them following from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user uid
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were followd
   */
  findAllUsersFollowees = (req: Request, res: Response) =>
    FollowController.followDao
      .findAllUsersFollowees(req.params.uid)
      .then((followees) => res.json(followees));

  /**
   * Deletes all followees from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user uid
   * @param {Response} res Represents response to client, including the
   * status on whether deleting the followees was successful or not
   * @return {Promise<boolean>}
   */
  deleteAllFollowees = (req: Request, res: Response) =>
    FollowController.followDao
      .deleteAllFollowees(req.params.uid)
      .then((status) => res.send(status));

  /**
   * Deletes all followers from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user uid
   * @param {Response} res Represents response to client, including the
   * status on whether deleting the followers was successful or not
   * @return {Promise<boolean>}
   */
  deleteAllFollowers = (req: Request, res: Response) =>
    FollowController.followDao
      .deleteAllFollowers(req.params.uid)
      .then((status) => res.send(status));
}
