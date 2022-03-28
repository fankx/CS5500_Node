/**
 * @file Declares dislike data type representing relationship between
 * users and tuits, as user dislikes a tuit
 */
import Tuit from '../tuits/Tuit';
import User from '../users/User';

/**
 * @typedef Dislike Represents dislikes relationship between a user and a tuit
 * @property {Tuit} tuit Tuit being disliked
 * @property {User} dislikedBy User who disliked the tuit
 */

export default interface Dislike {
  tuit: Tuit;
  dislikedBy: User;
}
