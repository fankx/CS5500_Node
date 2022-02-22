/**
 * @file implements the data model to represent tuits in the middle tier
 */
import User from '../users/User';

export default interface Tuit {
  tuit: string;
  postedBy: User;
  postedOn?: Date;
}
