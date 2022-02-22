import Like from '../models/likes/Like';
import Follow from '../models/follows/Follow';
import User from '../models/users/User';

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
  userFollowsUser(followerUid: string, followeeUid: string): Promise<Follow>;
  userUnfollowsUser(followerUid: string, followeeUid: string): Promise<any>;
  findAllUsersFollowers(uid: string): Promise<Follow[]>;
  findAllUsersFollowees(uid: string): Promise<Follow[]>;
  deleteAllFollowers(uid: string): Promise<any>;
  deleteAllFollowees(uid: string): Promise<any>;
}
