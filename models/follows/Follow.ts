/**
 * @file Declares Follow data type representing relationship between
 * user and other user, as in user follows another user
 */

import User from '../users/User';

/**
 * @typedef Follow Represents likes relationship between a user and another user,
 * as in a user follows another user
 * @property {User} follower the user as a follower
 * @property {User} followee the user as a followee
 */

export default interface Follow {
  follower: User;
  followee: User;
}
