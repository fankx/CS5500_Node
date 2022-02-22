/**
 * @file Declares Bookmark data type representing relationship between
 * user and tuit, as in user bookmarks another tuit
 */

import User from '../users/User';
import Tuit from '../tuits/Tuit';

/**
 * @typedef Bookmark Represents bookmarks relationship between a user and a tuit,
 * @property {User} user the instance of the user
 * @property {Tuit} tuit the instance of the tuit
 */

export default interface Bookmark {
  user: User;
  tuit: Tuit;
}
