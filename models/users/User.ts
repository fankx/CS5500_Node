/**
 * @file implements the data model to represent user in the middle tier
 */

import AccountType from './AccountType';
import MaritalStatus from './MaritalStatus';
import Location from './Location';
import mongoose from 'mongoose';

export default interface User {
  _id?: mongoose.Schema.Types.ObjectId;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email: string;
  profilePhoto?: string;
  headerImage?: string;
  accountType?: AccountType;
  maritalStatus?: MaritalStatus;
  biography?: string;
  dateOfBirth?: Date;
  joined?: Date;
  location?: Location;
  salary?: number;
}
