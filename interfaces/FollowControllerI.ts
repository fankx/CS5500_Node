/**
 * @file the interface of the followController
 */
import { Request, Response } from 'express';

export default interface FollowControllerI {
  userFollowsUser(req: Request, res: Response): void;
  userUnfollowsUser(req: Request, res: Response): void;
  findAllUsersFollowees(req: Request, res: Response): void;
  findAllUsersFollowers(req: Request, res: Response): void;
  deleteAllFollowees(req: Request, res: Response): void;
  deleteAllFollowers(req: Request, res: Response): void;
}
