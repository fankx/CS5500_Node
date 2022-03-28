/**
 * @file Declares like data type representing relationship between
 * users and tuits, as user likes a tuit
 */
import Tuit from '../tuits/Tuit';
import User from '../users/User';

/**
 * @typedef Like Represents likes relationship between a user and a tuit
 * @property {Tuit} tuit Tuit being liked
 * @property {User} likedBy User who liked the tuit
 */
export default interface Like {
  tuit: Tuit;
  likedBy: User;
}
